import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, ScrollView, RefreshControl, ToastAndroid } from 'react-native';
import SectionComponent from '../../components/learn/section'
import { Sections, getInstanceArraySection } from '../../model/Sections'
import Section from '../../model/Section'
import { Spinner } from 'native-base'


export default class SectionsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sections: getInstanceArraySection(),
            refresh: false,
            load: false
        }
        this.sections = new Sections()
        this.sections.get().then((sections) => {
            this.setState({ sections, load: true })
        })
            .catch((err) => {
                this.setState({ load: true })
                console.error(err);
                ToastAndroid.show('Hubo un error al cargar la lista de contenidos, intente de nuevo', ToastAndroid.SHORT)
            })
    }

    render() {

        if (!this.state.load) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='blue' />
                    <Text style={{ fontSize: Dimensions.get('window').width*0.03}}>Cargando...</Text>
                </View>
            );
        }

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ScrollView
                    contentContainerStyle={{ width: Dimensions.get('window').width * 0.998 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refresh}
                            onRefresh={() => {
                                this.setState({ refresh: true })
                                this.sections.get().then((sections) => {
                                    this.setState({ sections, refresh: false })
                                })
                                    .catch((err) => {
                                        console.error(err);
                                        this.setState({ refresh: false })
                                        ToastAndroid.show('Hubo un error al cargar la lista de contenidos, intente de nuevo', ToastAndroid.SHORT)
                                    })
                            }}
                        />
                    }
                >
                    {this.state.sections.map((section) => {
                        return <SectionComponent navigation={this.props.navigation} section={section} />
                    })}
                </ScrollView>
            </View>
        );
    }
}