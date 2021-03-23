import React, { useState } from 'react';
import { StyleSheet,Modal, View, Image, Dimensions, TouchableOpacity, Text, ToastAndroid, ImageBackground } from 'react-native';
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';


const MP_ACCESS_TOKEN = 'TEST-327743174144430-071520-f0276babdf909973e9dadc223501a3b4-408605535'
const MP_PUBLIC_KEY='TEST-f602cc6b-2238-4839-9e20-f224caf00f20'
// You should create the preference server-side, not client-side but we show client-side for the sake of simplicity

  
  export default class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        paymentResult:null,
        server: 'http://localhost/academia-qa-laravel/public/api/paypal/pago',
        status: "pending",
        modal: false
      }
    }

    payWithPaypal(){

    }

    getPreferenceId = async (payer, ...items) => {
      const response = await fetch(
        `https://api.mercadopago.com/checkout/preferences?access_token=${MP_ACCESS_TOKEN}`,
        {
          method: 'POST',
          body: JSON.stringify({
            items,
            payer: {
              email: payer,
            },
          }),
        }
      );
    
      const preference = await response.json();
    
      return preference.id;
    };
  
   startCheckout = async () => {
      try {
        const preferenceId = await this.getPreferenceId('payer@email.com', {
          title: 'Dummy Item Title',
          description: 'Dummy Item Description',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 10.0,
        });
  
        const payment = await MercadoPagoCheckout.createPayment({
          publicKey: MP_PUBLIC_KEY,
          preferenceId,
        });
  
        this.setState({paymentResult:payment})
      } catch (err) {
        Alert.alert('Something went wrong', err.message);
      }
    };
  
    render(){
      return (
        <View style={{padding:"5%"}}>
 
          <TouchableOpacity onPress={()=> this.startCheckout()}>
            <Text>Start Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.payWithPaypal()}>
            <Text>Start Payment with Paypal</Text>
          </TouchableOpacity>
          <Text>Payment: {JSON.stringify(this.state.paymentResult)}</Text>
        </View>
      );
    }
  }