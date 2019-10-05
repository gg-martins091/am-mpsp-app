import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { Container } from './styles';
import firebase from '../../utils/firebase';

export default class Dashboard extends Component {
    static navigationOptions = {
        title: 'Dashboard',
        headerStyle: {
          backgroundColor: '#3A41C7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    cpf: null,
                    rg: '00000',
                    link_relatório: ''
                },
                {
                    cpf: null,
                    rg: '00000',
                    link_relatório: ''
                },
                {
                    cpf: null,
                    rg: '00000',
                    link_relatório: ''
                },
                {
                    cpf: null,
                    rg: '00000',
                    link_relatório: ''
                },
                {
                    cpf: null,
                    rg: '00000',
                    link_relatório: ''
                },
                {
                    cpf: null,
                    rg: '00000',
                    link_relatório: 'http://google.com'
                },
                
            ]
        }
    }

    handleClick = (url) => {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            this.setState({error: 'Imposível abrir URL.'});
          }
        });
    };

    componentDidMount() {
        firebase.firestore().collection('flows').orderBy('created_at', 'desc').where('user_id', '==', this.props.id).onSnapshot(d => {
          this.getData();
        });
    }

    getData = async () => {
        let dataTmp = [];
        const d = await firebase.firestore().collection('flows')
          .orderBy('created_at', 'desc').where('user_id', '==', this.props.id).get();
    
        for (let index = 0; index < d.docs.length; index++) {
          const flow = d.docs[index];
          let data = flow.data();
          data['id'] = flow.id;
          data['sources'] = [];
          const sources = await this.firestore.collection('sources')
            .where('flow_id', '==', parseInt(flow.id)).get();
    
          sources.forEach(s => {
            data['sources'].push(s.data());
          });
          dataTmp.push(data);
        }
    
        this.setState({ data: dataTmp });
      }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                {this.state.error && <Text>{this.state.error}</Text>}
                {this.state.data.map((d, i) => 
                    <View key={i} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 35,
                        borderBottomColor: '#444',
                        borderBottomWidth: 1,
                        justifyContent: 'space-between'
                    }}>
                        <View>
                            {d.cpf && <Text>CPF: {d.cpf}</Text>}
                            {d.rg && <Text>RG: {d.rg}</Text>}
                            {d.cnpj && <Text>CNPJ: {d.cnpj}</Text>}
                        </View>
                        {d.link_relatório.length > 0 && <View>
                            <TouchableOpacity onPress={() => this.handleClick(d.link_relatório)}>
                                <Text style={{color:'#0275d8'}}>Relatório</Text>
                            </TouchableOpacity>
                        </View>}
                        {!d.link_relatório && <View>
                            <Text style={{color:'#999'}}>Processando</Text>
                        </View>}
                        
                    </View>
                )}
            </ScrollView>
        );
    }
}
