import React from 'react'; 
import {Platform,ScrollView, StyleSheet, FlatList,Text,Alert, View,Dimensions,ImageBackground,Image,Button} from 'react-native';
import {LocaleConfig, CalendarList} from 'react-native-calendars'; 
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { WebView } from 'react-native-webview'; 
import moviedata from './data'



const windowWidth = Dimensions.get('window').width; 


var movieData =  moviedata;

class LogoTitle extends React.Component {

  render() {
    return ( 
      <View>
        <Text style={{fontSize:20}}>  movie</Text> 
      </View>
    );
  }
}

class HomeScreen extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
    this.state.data=movieData;
    this.state.day=0; 
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="+1"
          color= 'red'
        />
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginTop:130 }}>
        <View style={{ }}>
      <ImageBackground source={  this.state.data[this.state.day].home}
      style={{width: windowWidth, height: 300,}}>
        <View style={{widthHight : windowWidth, height: 300, justifyContent:'flex-end',alignContent:'flex-end'}}>
        <Text style={{fontSize:20,color: 'white',padding:5,textAlign :'right',fontWeight: '200'}}
               onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Details', {
                  itemId: 86,
                  otherParam: '阿拉丁 ',
                });
              }}
        >   { this.state.data[this.state.day].language}    </Text>
        </View>
      </ImageBackground>
      </View>  
        <View>
            <CalendarList
            horizontal={true} 
            pagingEnabled={true} 
            calendarWidth={windowWidth}
            monthFormat = { '>  yy  MM  <' } 
            markingType={'multi-dot'}
            onDayPress={this.onDayPress} 
            hideExtraDays={false}
            showWeekNumbers={false}
            markedDates={{[this.state.selected]: {selected: true}}}
            />
        </View> 
      </View> 
    );
  }
}

class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};  
    this.state.data=movieData;
    this.state.day=0;
    this.state.expand=0;
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() { 

    return (

      <View style={{}}> 

      <ScrollView style={{ }}  showsVerticalScrollIndicator={true} endFillColor={'red'} 
      overScrollMode={'auto'} indicatorStyle={'black'}
      >
      <View style={{backgroundColor:'green', }}>
      <View style={{flex:1,backgroundColor:'green',width: windowWidth, height: 200,   magin:2,flexDirection:'row'}}>
          <View style={{flex:5,height: 200,justifyContent:'center'}}>
                <Image   source={ this.state.data[this.state.day].detail }
                        style={{width:120, height: 170,marginTop:15,marginLeft:10, marginBottom:15 }}>
                 
              </Image  >
          </View>
          <View style={{ flex:5,marginLeft:40,marginTop:30,marginBottom:70, padding :0}}>
                <Text style={{fontSize:20,textShadowColor:'black', }}>{this.state.data[this.state.day].nameChinese}</Text> 
                <Text style={{fontSize:15,textShadowColor:'black', }}>{this.state.data[this.state.day].nameEnglish}</Text>
                <Text style={{fontSize:15,textShadowColor:'black', }}>{this.state.data[this.state.day].prop}</Text>
                <Text style={{fontSize:15,textShadowColor:'black', }}>{this.state.data[this.state.day].country}</Text> 
                <Text style={{fontSize:20,textShadowColor:'black', }}>{this.state.data[this.state.day].score}</Text>  
          </View>
          <View  style={{flex: 2,justifyContent:'center'}}>
            <Text
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              this.props.navigation.navigate('Third', {
                itemId: 86,
                otherParam: '阿拉丁 ',
              });
            }}
            >   ></Text>
            </View>
      </View>  
        
    <View style={{width:windowWidth,backgroundColor:'white'}}>
         {
           this.state.expand===0?
           <View>
             <View style={{marginTop: 0,backgroundColor:'white',marginLeft:10, height:120,marginRight :2}}>
                  <Text style={{fontSize:15,  textShadowColor:'white'}}>{this.state.data[this.state.day].introducej}</Text> 
                  <Button
                              onPress={() => 
                                  {  this.setState({expand:1}) }}
                                        title="展开" 
                                        color='green'
                                      />   
             </View>
           </View>:null
         }
        {
           this.state.expand===1?
           <View>
             <View style={{marginTop: 0,backgroundColor:'white',marginLeft:10, height:200,marginRight:2}}>
                  <Text style={{fontSize:15,  textShadowColor:'white'}}>{this.state.data[this.state.day].introduce}</Text> 
                  <Button
                              onPress={() => 
                                  {  this.setState({expand:0}) }}
                                        title="收起"
                                        color='green'
                                      />   
             </View>
           </View>:null
         }
    </View>
  </View>

  <View style={{marginLeft:10,height:250,marginTop:0}}>
        <Text style={{fontSize:20, marginTop:5}}>演职人员</Text>
        < FlatList
                  horizontal={true}
                   data={this.state.data[this.state.day].actor}
                   keyExtractor={item =>item.name}
                   renderItem={({item})=>
                   <View  style={{width:120, height: 200, padding:5,marginLeft:5,alignContent:'center'   }}>
                        <Image   source={item.arl}
                        style={{width:120, height: 150,   }}>
                        </Image  >
                        <View style={{alignSelf:'center'}}>
                        <Text style={{fontSize: 12}}>
                         {item.name} 
                        </Text>
                        </View>
                        <View style={{alignSelf:'center'}}>
                        <Text style={{fontSize: 10}}>
                         {item.name2} 
                        </Text>
                        </View>
                    </View>
                }
                      /> 
    </View>
   <View style={{backgroundColor:'white',width:windowWidth,height:20,}}>
     </View>
     
     <View style={{marginLeft:10,height:250,marginTop:0}}>
        <Text style={{fontSize:20, marginTop:5}}>视频剧照</Text>
        < FlatList
                  horizontal={true}
                   data={this.state.data[this.state.day].vedio}
                   keyExtractor={item =>item.name}
                   renderItem={({item})=>
                   <View  style={{width:120, height: 200, padding:5,marginLeft:5,alignContent:'center'   }}>
                        <Image   source={ item.arl}
                        style={{width:120, height: 150,   }}>
                        </Image  >
                        <View style={{alignSelf:'center'}}>
                        <Text style={{fontSize: 15}}>
                         {item.name} 
                        </Text>
                        </View>
                        <View style={{alignSelf:'center'}}>
                        <Text style={{fontSize: 15}}>
                         {item.name} 
                        </Text>
                        </View>
                    </View>
                }
                      /> 
    </View>

    
    
    

    <View style={{marginTop: 0,backgroundColor:'white',marginLeft:10,width:windowWidth,height:200}}>
        <Text style={{fontSize:16, textShadowColor:'white'}}>简介</Text> 
        <Text style={{fontSize:16,  textShadowColor:'white'}}>在充满异域风情的古代阿拉伯王国，
        善良的穷小子阿拉丁（莫纳·马苏德 饰）和勇敢的茉莉公主 （纳奥米·斯科特 饰）浪漫邂逅，在可以满足主人公三个愿望
        的神灯精灵 （威尔·史密斯 饰）的帮助下，两人踏上了一次寻找真爱和自我的魔幻冒险</Text>  
    </View>

    </ScrollView>
    </View>
    );
  }
}

class ThirdScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() { 

    return (
      <View style={{ flex: 1,  }}>
         <WebView
        source={{  uri: '  https://movie.douban.com/subject/27060077/?tag=%E7%83%AD%E9%97%A8&from=gaia_video' }}
        style={{ marginTop: 20 }}
      />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Third: {
        screen : ThirdScreen,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


//老谈的app.js