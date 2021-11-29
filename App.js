import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Picker , TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Contador from './contador';

export default function App() {

    console.disableYellowBox = true;
    const [estado, setarEstado] = useState('selecionar');
    const [segundos, setarSegundos] = useState(1);
    const [minutos, setarMinutos] = useState(0);

    const [alarmeSound, setarAlarmSound] = useState([
      {
        id:1,
        selecionado: true,
        som:'alarme 1',
        file: 'alarm1.mp3'
      },

      {
        id:2,
        selecionado: false,
        som:'alarme 2',
        file:'alarm2.mp3'
      }
    ]);

    var numeros = [];
    for(var i=1; i<=60; i++){
      numeros.push(i);
    }

    function setarAlarme(id){
      let alarmesTemp = alarmeSound.map(function(val){
        if(id != val.id){
          val.selecionado = false;
        }else{
        val.selecionado = true;
        }
        return val;
      });
      
      setarAlarmSound(alarmesTemp);
    }

  if(estado == 'selecionar'){
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(214,89,163,1)', 'rgb(113,0,255)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%'
        }}
      />
      <Text style={{color:'white', fontSize:30}}>Selecione o Tempo:</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'white', paddingTop:10}}>Min:</Text>
        <Picker itemStyle={{height:50}} selectedValue={minutos} onValueChange={(itemValue, itemIndex) => setarMinutos(itemValue)} style={{ height:50, width: 100, color: 'white'}}>
          <Picker.Item label='0' value='0'/>
          {
          numeros.map(function(val){
            return(<Picker.Item label={val.toString()} value={val.toString()}/>);
          })
          }
          
        </Picker>
        <Text style={{color:'white', paddingTop:10}}>Seg:</Text>
        <Picker itemStyle={{height:50}} selectedValue={segundos} onValueChange={(itemValue, itemIndex) => setarSegundos(itemValue)} style={{ height:50, width: 100, color: 'white'}}>
          {
          numeros.map(function(val){
            return(<Picker.Item label={val.toString()} value={val.toString()}/>);
          })
          }
          
        </Picker>
      </View>

      <View style={{flexDirection:'row'}}>
        {
          alarmeSound.map(function(val){
            if(val.selecionado){
              return(<TouchableOpacity onPress={() =>setarAlarme(val.id)} style={styles.btnEscolherSelecionado}>
                <Text style={{color: 'white'}}>{val.som}</Text>
                </TouchableOpacity>
              );
            }else{
              return(<TouchableOpacity onPress={() =>setarAlarme(val.id)} style={styles.btnEscolher}>
                <Text style={{color: 'white'}}>{val.som}</Text>
                </TouchableOpacity>
              );
            }
          })  
        }
      </View>
        <TouchableOpacity onPress={()=> setarEstado('iniciar')} style={styles.btnIniciar}><Text style={{textAlign:'center',paddingTop:26, color: 'rgb(113,0,255)', fontSize:22}}>Iniciar</Text></TouchableOpacity>
      
    </View>
  );
  }else if(estado == 'iniciar'){

    return(
      <Contador setarMinutos={setarMinutos} setarSegundos={setarSegundos} setarEstado={setarEstado} minutos={minutos} segundos={segundos}></Contador> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgb(80, 50, 168)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEscolher: {
    width:100,
    padding: 8,
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(113,0,255, 0.5)',
    borderColor: 'rgba(113,0,255, 1)',
    borderWidth: 0.3
  },
  btnEscolherSelecionado: {
    width:100,
    padding: 8,
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(113,0,255)'
  },
  btnIniciar: {
    width:100,
    height:100,
    padding: 10,
    marginTop: 80,
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth:1,
    //backgroundColor: 'rgb(113,0,255)'
    backgroundColor: 'white'
  },
});
