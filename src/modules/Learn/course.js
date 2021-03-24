import React from 'react'
import { FlatList, Dimensions, TouchableOpacity, TouchableHighlight, LayoutAnimation, Platform, UIManager, Modal, Image , ScrollView} from 'react-native'
import { View, Spinner, Text, Card, Button, CardItem, Left, Right, Body, Thumbnail } from 'native-base'
import Courses from '../../model/Courses'
import ItemModule from '../../components/learn/itemModule'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { MIN_PASSED, SERVER } from '../../config/config'
import ItemCourse from '../../components/learn/itemCourse'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Line({ marginLeft, width, height, hide }) {
    width = width ? width : 3
    return (
        <View style={{
            backgroundColor: hide ? null : "#d5d5d5",
            width,
            flex: 1,
            height: height ? height : null,
            marginLeft: marginLeft - (width / 2)
        }} />
    )
}

function ProgressBar({ width, height, percent, colorBar, colorProgress }) {
    percent = percent > 100 ? 100 : percent < 0 ? 0 : percent
    var widthProgress = width * percent / 100
    colorBar = colorBar ? colorBar : "#d5d5d5"
    colorProgress = colorProgress ? colorProgress : percent < 100 ? "#6ab4ff" : "#0ec842"
    return (<View style={{
        width: width,
        height: height,
        borderRadius: height / 2,
        backgroundColor: colorBar
    }}>
        <View
            style={{
                width: widthProgress,
                height: height,
                borderRadius: height / 2,
                backgroundColor: colorProgress
            }}
        />
    </View>)
}

/////MERCADO PAGO
const MP_ACCESS_TOKEN = 'TEST-327743174144430-071520-f0276babdf909973e9dadc223501a3b4-408605535'
const MP_PUBLIC_KEY='TEST-f602cc6b-2238-4839-9e20-f224caf00f20'
/////////

export default class Course extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: null,
            activeIndex: null,
            modalBuy: false,
            paymentId: 0,
            scroll:0 ,
            MppaymentResult:null
        }
        this.payments = [
            require('../../../assets/general/paypal.png'),
            require('../../../assets/general/mercadopago.png')
        ]
        this.fontSize = Dimensions.get('window').width * 0.03
        this.percentRadius = 8.5
        this.coursesModel = new Courses()
        this.coursesModel.find(this.props.route.params.id).then(course => {
            //course.locked = true
            //course.modules[0].lessons[0].percent = 40
            this.setState({ course })
        })
        this.premium = false
    }

    getMercadoPagoPreferenceId = async (payer, ...items) => {
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

 async PayWithMercadoPago(){
        try {
           
            const preferenceId = await this.getMercadoPagoPreferenceId('payer@email.com', {
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
       
            this.setState({MppaymentResult:payment})
          } catch (err) {
            Alert.alert('Something went wrong', err.message);
          }
    }

    getHeight(width, sourceDir) {
        let source = resolveAssetSource(sourceDir)
        return (width * source.height) / source.width
    }


    radioButton = ({ diameter, color, active, onPress }) => {

        return (<TouchableOpacity
            onPress={onPress}
            style={{
                width: diameter,
                height: diameter,
                borderColor: color,
                borderWidth: diameter * 0.1,
                borderRadius: diameter / 2,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {active ?
                <View style={{
                    width: diameter / 2,
                    height: diameter / 2,
                    backgroundColor: color,
                    borderRadius: diameter / 4
                }} />
                :
                null
            }
        </TouchableOpacity>)
    }

    modalBuy = ({ visible, onRequestClose }) => {
        var RadioButton = this.radioButton
        var lessons = 0
        var modules = 0
        if (this.state.course && this.state.course.modules) {
            this.state.course.modules.forEach(module => {
                ++modules
                module.lessons.forEach(lesson => {
                    ++lessons
                })
            });
        }
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onRequestClose}
            >
                <TouchableOpacity
                    onPress={onRequestClose}
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.35)'
                    }}
                >
                    <TouchableHighlight >
                        <View style={{
                            borderRadius: Dimensions.get('window').width * 0.05,
                        }}>
                            <Card style={{
                                width: Dimensions.get('window').width * 0.85,
                                borderRadius: Dimensions.get('window').width * 0.05,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.29,
                                shadowRadius: 4.65,
                                elevation: 7
                            }}>
                                <CardItem bordered style={{
                                    backgroundColor: '#404040',
                                    borderTopLeftRadius: Dimensions.get('window').width * 0.05,
                                    borderTopRightRadius: Dimensions.get('window').width * 0.05,
                                }}>
                                    <Body style={{
                                        paddingVertical: Dimensions.get('window').height * 0.01
                                    }}>
                                        <Text style={{
                                            color: 'white'
                                        }}>
                                            {this.state.course.name}
                                        </Text>
                                    </Body>
                                    <Right>
                                        <TouchableOpacity onPress={onRequestClose}>
                                            <Icon2
                                                name="close"
                                                size={Dimensions.get('window').width * 0.05}
                                                color="gray"
                                            />
                                        </TouchableOpacity>
                                    </Right>
                                </CardItem>
                                <CardItem bordered style={{
                                    borderBottomLeftRadius: this.state.course.locked ? 0 : Dimensions.get('window').width * 0.05,
                                    borderBottomRightRadius: this.state.course.locked ? 0 : Dimensions.get('window').width * 0.05
                                }}>
                                    <Left>
                                        <View style={{
                                            alignItems: 'center',
                                            padding: Dimensions.get('window').width * 0.025
                                        }}>
                                            <Thumbnail
                                                source={{
                                                    uri: SERVER + "img/" + this.state.course.image
                                                }}
                                                style={{ marginBottom: Dimensions.get('window').height * 0.01 }}
                                            />
                                            <Text style={{ textAlign: 'center', marginLeft: 0 }}>{this.state.course.name}</Text>
                                            {this.state.course.locked ?
                                                <Text note style={{
                                                    textAlign: 'center',
                                                    marginLeft: 0,
                                                    fontSize: Dimensions.get('window').width * 0.0525
                                                }}>
                                                    {"US $" + this.state.course.price}
                                                </Text>
                                                :
                                                <Text note style={{
                                                    textAlign: 'center',
                                                    marginLeft: 0,
                                                    fontSize: Dimensions.get('window').width * 0.02
                                                }}>
                                                    DESBLOQUEADO
                                                </Text>
                                            }
                                        </View>
                                        <Body style={{}}>
                                            <Text note style={{ textAlign: 'justify', fontSize: Dimensions.get('window').width * 0.0275 }}>{this.state.course.description}</Text>
                                            <Text style={{
                                                paddingTop: Dimensions.get('window').height * 0.005
                                            }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: Dimensions.get('window').width * 0.03
                                                }}>
                                                    Módulos:
                                                </Text>
                                                <Text style={{
                                                    fontSize: Dimensions.get('window').width * 0.03
                                                }}>
                                                    {" " + modules}
                                                </Text>
                                                <Text> / </Text>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: Dimensions.get('window').width * 0.03
                                                }}>
                                                    Lecciones:
                                                </Text>
                                                <Text style={{
                                                    fontSize: Dimensions.get('window').width * 0.03
                                                }}>
                                                    {" " + lessons}
                                                </Text>
                                            </Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                {this.state.course.locked ?
                                    <CardItem>
                                        <Body>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                Métodos de pago:
                                        </Text>
                                        </Body>
                                    </CardItem>
                                    :
                                    null
                                }
                                {this.state.course.locked ?
                                    <CardItem cardBody bordered>
                                        <View style={{
                                            width: '100%',
                                            paddingBottom: Dimensions.get('window').height * 0.025
                                        }}>
                                            {this.payments.map((payment, index) => {
                                                return (
                                                    <View style={{
                                                        width: '100%',
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <View style={{
                                                            paddingHorizontal: Dimensions.get('window').width * 0.03
                                                        }}>
                                                            <RadioButton
                                                                active={this.state.paymentId == index}
                                                                diameter={Dimensions.get('window').width * 0.075}
                                                                color="#404040"
                                                                onPress={() => {
                                                                    this.setState({ paymentId: index })
                                                                }}
                                                            />
                                                        </View>
                                                        <TouchableOpacity onPress={() => {
                                                            this.setState({ paymentId: index })
                                                        }}>
                                                            <Image
                                                                source={payment}
                                                                style={{
                                                                    height: this.getHeight(Dimensions.get('window').width * 0.3, payment),
                                                                    width: Dimensions.get('window').width * 0.3,
                                                                }}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </CardItem>
                                    :
                                    null
                                }
                                {this.state.course.locked ?
                                    <CardItem bordered style={{
                                        borderBottomLeftRadius: Dimensions.get('window').width * 0.05,
                                        borderBottomRightRadius: Dimensions.get('window').width * 0.05
                                    }}>
                                        <View style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                        }}>
                                            <View style={{ width: '50%', paddingHorizontal: '2.5%', flexDirection: 'row', justifyContent: 'center' }}>
                                                <Button
                                                    style={{
                                                        width: '100%',
                                                        justifyContent: 'center',
                                                        backgroundColor: '#404040'
                                                    }}
                                                    onPress={() => {
                                                       // this.setState({ modalBuy: false })
                                                        this.PayWithMercadoPago()
                                                    }}
                                                >
                                                    <Text>Comprar</Text>
                                                </Button>
                                            </View>
                                            <View style={{ width: '50%', paddingHorizontal: '2.5%', flexDirection: 'row', justifyContent: 'center' }}>
                                                <Button
                                                    style={{
                                                        width: '100%',
                                                        justifyContent: 'center',
                                                        borderColor: '#404040'
                                                    }}
                                                    bordered
                                                    onPress={() => {
                                                        this.setState({ modalBuy: false })
                                                    }}
                                                >
                                                    <Text style={{ color: '#404040' }}>Ahora no</Text>
                                                </Button>
                                            </View>
                                        </View>
                                    </CardItem>
                                    :
                                    null
                                }
                            </Card>
                        </View>
                    </TouchableHighlight>
                </TouchableOpacity>
            </Modal>
        )
    }

    lesson = ({ lesson, marginLeft, unlocked, last , index, index_module}) => {
        var sizePoint = Dimensions.get('window').width * 0.035
        return (
            <View style={{

            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View>
                        <Line marginLeft={marginLeft} />
                        <View style={{
                            width: sizePoint,
                            height: sizePoint,
                            borderRadius: sizePoint / 2,
                            backgroundColor: lesson.percent >= MIN_PASSED ? '#0ec842' : (unlocked ? 'gray' : '#d5d5d5'),
                            marginLeft: marginLeft - (sizePoint / 2)
                        }} />
                        <Line marginLeft={marginLeft} hide={last} />
                    </View>
                    <TouchableOpacity style={{
                        marginVertical: Dimensions.get('window').height * 0.01,
                        marginLeft: Dimensions.get('window').width * 0.05,
                        backgroundColor: 'white',
                        width: Dimensions.get('window').width * 0.75,
                        paddingHorizontal: Dimensions.get('window').width * 0.04,
                        paddingVertical: Dimensions.get('window').height * 0.025,
                        borderRadius: Dimensions.get('window').width * 0.025,
                        flexDirection: 'row'
                    }}>
                        <View>
                            <Text style={{ color: "gray" , fontSize:Dimensions.get('window').width*0.035, fontWeight:'bold'}}>
                                Lección {index_module+1}.{index+1}
                            </Text>
                            <Text style={{ 
                                color: "#acacac", 
                                marginTop:Dimensions.get('window').height*0.08,
                                fontSize:Dimensions.get('window').width*0.035
                            }}>
                                {lesson.name}
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent:'flex-end'
                        }}>
                            {!unlocked ?
                                <Icon name="lock" size={25} color="#d5d5d5" />
                                :
                                lesson.percent >= MIN_PASSED?
                                    <Icon2 name="check-circle" size={25} color="#0ec842" />
                                    :
                                    <Icon2 name="play-circle" size={25} color="gray" />
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    moduleAproved = (module) => {
        var lessons = 0
        var lessonsPassed = 0
        module.lessons.forEach(lesson => {
            ++lessons
            if (lesson.percent >= MIN_PASSED) {
                ++lessonsPassed
            }
        })
        return lessons != 0 && (lessonsPassed == lessons)
    }

    module = ({ module, show, last, onClick, index, unlocked }) => {
        var lessons = 0
        var lessonsPassed = 0
        module.lessons.forEach(lesson => {
            ++lessons
            if (lesson.percent >= MIN_PASSED) {
                ++lessonsPassed
            }
        })
        var percent = 100 * lessonsPassed / lessons
        var radius = Dimensions.get('window').width * this.percentRadius / 100
        var marginLeft = Dimensions.get('window').width * 0.05
        var index_module = index
        return (
            <View style={{ width: '100%' , paddingTop:index==0?Dimensions.get('window').height*0.01:0 }}>
                <View style={{
                    marginLeft,
                    width: '100%',
                    paddingVertical: Dimensions.get('window').width * 0.01,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex:1
                }}>
                    <ItemModule
                        percent={percent}
                        radius={radius}
                        borderWidth={3}
                        img={module.image}
                        svg={true}
                        unlocked={unlocked}
                        onPress={() => {
                            if (onClick) {
                                onClick(index)
                            }
                        }}
                    />
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', height: radius * 2 }}
                        onPress={() => {
                            if (onClick) {
                                onClick(index)
                            }
                        }}
                    >
                        <View style={{ marginLeft: Dimensions.get('window').width * 0.025 }}>
                            <Text style={{ fontSize: this.fontSize, alignSelf: 'flex-start' }}>{module.name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {!last ?
                    <Line marginLeft={marginLeft + radius} height={Dimensions.get('window').height * 0.02} />
                    :
                    null
                }
                {show && module.lessons.length ?
                    <View>
                        <FlatList
                            data={module.lessons}
                            renderItem={({ item, index }) => {
                                return this.lesson({
                                    index:index,
                                    index_module:index_module,
                                    lesson: item,
                                    marginLeft: marginLeft + radius,
                                    unlocked: (unlocked && (index == 0)) || (index != 0 && module.lessons[index - 1].percent >= MIN_PASSED),
                                    last: (index + 1 == module.lessons.length) && last
                                })
                            }}
                            keyExtractor={item => item.id}
                        />
                        {!last ?
                            <Line marginLeft={marginLeft + radius} height={Dimensions.get('window').height * 0.02} />
                            :
                            null
                        }
                    </View>
                    :
                    null
                }
            </View>
        )
    }

    render() {
        if (!this.state.course) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='blue' />
                    <Text style={{ fontSize: Dimensions.get('window').width * 0.03 }}>Cargando...</Text>
                </View>
            );
        }
        var lessons = 0
        var lessonsPassed = 0
        var modules = 0
        var modulesPassed = 0
        if (this.state.course && this.state.course.modules) {
            this.state.course.modules.forEach(module => {
                ++modules
                var lessonsPassedTmp = 0
                module.lessons.forEach(lesson => {
                    ++lessons
                    if (lesson.percent >= MIN_PASSED) {
                        ++lessonsPassed
                        ++lessonsPassedTmp
                    }
                })
                if (module.lessons.length == lessonsPassedTmp && module.lessons.length != 0) {
                    ++modulesPassed
                }
            });
        }

        var percent = 0
        var percentModules = 0

        if (lessons > 0) {
            percent = 100 * lessonsPassed / lessons
        }
        if (modules > 0) {
            percentModules = 100 * modulesPassed / modules
        }

        var ModalBuy = this.modalBuy
        return (
            <View style={{
                flex:1
            }}>
                <ModalBuy
                    visible={this.state.modalBuy}
                    onRequestClose={() => this.setState({ modalBuy: false })}
                />
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingVertical: Dimensions.get('window').height * 0.02,
                    alignItems: 'flex-start',
                    paddingHorizontal: Dimensions.get('window').width * 0.05,
                    backgroundColor: 'white'
                }}>
                    <ItemCourse
                        percent={percent}
                        radius={Dimensions.get('window').width * this.percentRadius / 100}
                        borderWidth={3}
                        img={this.state.course.image}
                    />
                    <View style={{
                        marginLeft: Dimensions.get('window').width * 0.05,
                        paddingBottom: Dimensions.get('window').height * 0.01,
                    }}>
                        <View style={{
                            paddingVertical: Dimensions.get('window').height * 0.005,
                            flexDirection: 'row',
                            width: Dimensions.get('window').width * 0.68
                        }}>
                            <View style={{
                                width: '50%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    color: 'gray',
                                    fontSize: Dimensions.get('window').height * 0.0225,
                                    fontWeight: 'bold'
                                }}>
                                    {this.state.course.name}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ modalBuy: true })
                                }}
                                style={{
                                    flexDirection: 'row',
                                    width: '50%',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center'
                                }}
                            >
                                <Icon
                                    name={this.state.course.locked ? "lock" : "align-justify"}
                                    size={Dimensions.get('window').height * 0.015}
                                    color={this.state.course.locked ? "#6ab4ff" : "#0ec842"}
                                />
                                <Text style={{
                                    fontSize: Dimensions.get('window').height * 0.015,
                                    marginLeft: Dimensions.get('window').width * 0.01,
                                    color: this.state.course.locked ? "#6ab4ff" : "#0ec842"
                                }}>
                                    {this.state.course.locked ? "DESBLOQUEAR" : "DESCRIPCIÓN"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: Dimensions.get('window').width * 0.68,
                            marginBottom: Dimensions.get('window').height * 0.005
                        }}>
                            <View style={{
                                width: '70%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: Dimensions.get('window').height * 0.0175,
                                    color: 'gray'
                                }}>
                                    Lecciones Completadas
                                </Text>
                            </View>
                            <View style={{
                                width: '30%',
                                alignItems: 'flex-end'
                            }}>
                                <Text style={{
                                    fontSize: Dimensions.get('window').height * 0.0175,
                                    color: lessonsPassed < lessons || lessons < 1 ? "#6ab4ff" : "#0ec842"
                                }}>
                                    {lessonsPassed + "/" + lessons}
                                </Text>
                            </View>
                        </View>
                        <ProgressBar
                            width={Dimensions.get('window').width * 0.68}
                            height={Dimensions.get('window').height * 0.01}
                            percent={percent}
                        />
                        <View style={{
                            flexDirection: 'row',
                            width: Dimensions.get('window').width * 0.68,
                            marginBottom: Dimensions.get('window').height * 0.005,
                            marginTop: Dimensions.get('window').height * 0.01,
                        }}>
                            <View style={{
                                width: '70%',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: Dimensions.get('window').height * 0.0175,
                                    color: 'gray'
                                }}>
                                    Módulos Completados
                                </Text>
                            </View>
                            <View style={{
                                width: '30%',
                                alignItems: 'flex-end'
                            }}>
                                <Text style={{
                                    fontSize: Dimensions.get('window').height * 0.0175,
                                    color: modulesPassed < modules || modules < 1 ? "gray" : "#0ec842"
                                }}>
                                    {modulesPassed + "/" + modules}
                                </Text>
                            </View>
                        </View>
                        <ProgressBar
                            width={Dimensions.get('window').width * 0.68}
                            height={Dimensions.get('window').height * 0.01}
                            percent={percentModules}
                            colorProgress="gray"
                        />
                    </View>
                </View>
                <View style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#d5d5d5',
                }} />
                <FlatList
                    data={this.state.course.modules}
                    renderItem={({ item, index }) => {
                        return this.module({
                            index: index,
                            module: item,
                            unlocked: !this.state.course.locked && ((index == 0) || this.moduleAproved(this.state.course.modules[index - 1])),
                            show: (this.state.activeIndex == index),
                            last: (index + 1 == this.state.course.modules.length),
                            onClick: (index) => {
                                LayoutAnimation.configureNext(LayoutAnimation.create(175, 'linear', 'opacity'));
                                if (index == this.state.activeIndex) {
                                    this.setState({ activeIndex: null })
                                } else {
                                    this.setState({ activeIndex: index })
                                }
                            }
                        })
                    }}
                    keyExtractor={item => item.id}
                    onScroll={({nativeEvent})=>{
                        if (nativeEvent.contentOffset.y <= 100) {
                            
                        }
                    }}
                />
            </View>
        )
    }
}