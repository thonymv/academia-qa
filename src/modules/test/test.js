import React, { useState } from 'react';
import {Modal, View,ActivityIndicator ,Dimensions ,TouchableOpacity, Text } from 'react-native';
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';
import { WebView } from 'react-native-linkedin/node_modules/react-native-webview';
import { SERVER } from '../../config/config';
const MP_ACCESS_TOKEN = 'TEST-327743174144430-071520-f0276babdf909973e9dadc223501a3b4-408605535'
const MP_PUBLIC_KEY='TEST-f602cc6b-2238-4839-9e20-f224caf00f20'

  export default class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        paymentResult:null,
        status: "pending",
        modal: false,
        visible: true
      }
      this.server = SERVER+'api/paypal/pago'
      this.width = Dimensions.get('window').width
      this.height = Dimensions.get('window').height
    }

    hideSpinner() {
      this.setState({ visible: false });
    }

    payWithPaypal(){
        this.setState({modal:true})
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

    handleResponse = data => {
      console.log(data.url)
      console.log(data.title)

      if (data.title === 'success') {

        this.setState({modal:false})
        alert("Pago Realizado")
        
      }
    }
  
    render(){
      return (
        <View style={{padding:"5%"}}>
           <Modal 
          visible={this.state.modal}
          onRequestClose={() => this.setState({modal:false})}
          >
            <WebView source={{uri:this.server}} 
                          onLoad={() => this.hideSpinner()}

        onNavigationStateChange={data => this.handleResponse(data) }
          />
            
            {this.state.visible && (
               <ActivityIndicator size="large" color="lightblue" style={{position:"absolute"
               ,top:this.height*0.4,left:this.width*0.45}} />
            )}

          </Modal>
          
         

          <TouchableOpacity onPress={()=> this.startCheckout()}>
            <Text>Start Payment with MercadoPago</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.payWithPaypal()}>
            <Text>Start Payment with Paypal</Text>
          </TouchableOpacity>
          <Text>Payment: {JSON.stringify(this.state.paymentResult)}</Text>
          <Text>Payment Paypal: {JSON.stringify(this.state.status)}</Text>
        </View>
      );
    }
  }