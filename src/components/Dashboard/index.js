import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { Container } from './styles';
import firebase from '../../utils/firebase';
import { getId } from '../../utils/storage';

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
                    cpf: '09928371182',
                    rg: '621813588',
                    link_relatório: ''
                },
                {
                    cpf: '03392812338',
                    link_relatório: ''
                },
                {
                    rg: '5582291102',
                    link_relatório: 'https://firebasestorage.googleapis.com/v0/b/am-mpsp.appspot.com/o/relatorios%2Frelatorio.pdf?alt=media'
                },
                {
                    cnpj: '204003882991103',
                    link_relatório: ''
                },
                {
                    rg: '335589483',
                    link_relatório: 'https://firebasestorage.googleapis.com/v0/b/am-mpsp.appspot.com/o/relatorios%2Frelatorio.pdf?alt=media'
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

    async componentDidMount() {
        const id = await getId();
        /* firebase.firestore().collection('flows').orderBy('created_at', 'desc').where('user_id', '==', parseInt(1)).onSnapshot(d => {
          this.getData(id);
        }); */
    }

    getData = async (id) => {
        let dataTmp = [];
        const d = await firebase.firestore().collection('flows')
          .orderBy('created_at', 'desc').where('user_id', '==', 1).get();
    
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
