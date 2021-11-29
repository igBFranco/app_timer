import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Picker , TouchableOpacity} from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

export default function Contador(props) {

    var done = false;

    useEffect(()=>{

        const timer = setInterval(()=>{

            props.setarSegundos(props.segundos-1);

            if(props.segundos <= 0){
                if(props.minutos > 0){
                    props.setarMinutos(minutos-1);
                    props.setarSegundos(59);
                }else{
                    if(!done){
                        done = true;
                        props.setarEstado('selecionar');
                        props.setarMinutos(0);
                        props.setarSegundos(1);
                        playSound();
                        alert('O Tempo Acabou');
                    }
                }
            }

        },1000)

        return () => clearInterval(timer);

    })

    async function playSound(){
      const soundObject = new Audio.Sound();
        try {
          var alarme;
          props.alarmes.map(function(val){
              if(val.selecionado){
                alarme = val.file;
              }
          })
            await soundObject.loadAsync(alarme);
            await soundObject.playAsync();

            await sound.unloadAsync();
        } catch (error) {
          
        }
    }


    function resetar(){
        props.setarEstado('selecionar');
        props.setarMinutos(0);
        props.setarSegundos(1);
    }

    function formatarNumero(number){
        var finalNumber = "";
        if(number < 10){
            finalNumber= "0"+number;
        }else{
            finalNumber = number;
        }
        return finalNumber;
    }
    var segundos = formatarNumero(props.segundos);
    var minutos = formatarNumero(props.minutos);


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
      
      <View style={styles.card}>

        <View style={{flexDirection: 'row', paddingBottom:'5%', paddingTop:'50%'}}>
            <Text style={styles.textContador}>{minutos} : </Text>
            <Text style={styles.textContador}>{segundos}</Text>
        </View>

        <View style={{paddingTop:'70%'}}>
            <TouchableOpacity onPress={()=> resetar()} style={styles.btnResetar}><Text style={{textAlign:'center',paddingTop:20, color: 'white', fontSize:26}}>Resetar</Text></TouchableOpacity>
        </View>
      </View>
    </View>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgb(80, 50, 168)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContador: {
    paddingTop: 30,
    color: 'rgb(113,0,255)',
    fontSize:40,
  },
  card: {
    display:'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    width: '80%', 
    height: '80%', 
    borderRadius: 20, 
    alignItems:`center`,
  },
  btnResetar: {
    width:200,
    height:80,
    padding: 4,
    marginTop: 80,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgb(113,0,255)',
    borderWidth:1,
    backgroundColor: 'rgb(113,0,255)'
  },
});
