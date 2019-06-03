import React, {Component} from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    Text,
    TextInput,
    FlatList,
    ScrollView,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Overlay } from 'react-native-elements'
 

const Width=Dimensions.get('window').width;
const Height=Dimensions.get('window').height;
export default class Schedule extends Component {
    constructor(props){
        super(props)
        this.state={
            isVisible:false,
            title:'',
            details:'',
            schedule:{
                title:'',
                details:'',
                id:0,
                complete:false,
                date:[],
            },
            data:[],
            day:'',
            month:'',
            offsetY:0,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <CalendarStrip 
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'background',highlightColor:'white'}}
                    style={{height: 100, paddingTop: 10, paddingBottom: 10}}
                    calendarHeaderStyle={{color: 'white'}}
                    calendarColor={'#0DA463'}
                    dateNumberStyle={{color: 'white'}}
                    dateNameStyle={{color: 'white'}}
                    highlightDateNumberStyle={{color: '#0DA463'}}
                    highlightDateNameStyle={{color: '#0DA463'}}
                    iconLeft={require('./img/left-arrow.png')}
                    iconRight={require('./img/right-arrow.png')}
                    iconContainer={{flex: 0.1}}
                    onDateSelected={this._setDate}
                    ref='calendarStrip'
                    />
                {
                    this.state.isVisible ===true?
                    <Overlay isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                    height={Height*0.43}
                    width={Width*0.7}
                    overlayBackgroundColor={'#0DA463'}
                    >
                    <View>
                        <View style={{flexDirection:'row',height:Height*0.1}}>
                            <View style={{justifyContent:'center',alignItems:'center',height:Height*0.09,width:Width*0.5}}>
                            <Text style={{fontSize:25,color:'white',marginLeft:Width*0.15}}>New Task</Text>
                            </View>
                            <TouchableOpacity onPress={()=>this.setState({isVisible:false})}>
                            <Image style={{width:Width*0.15,height:Height*0.09}} source={require('./img/X.png')} resizeMode='center'></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:Width*0.65,height:Height*0.5}}>
                            <Text style={{fontSize:20,color:'white',marginTop:5}} >Add Title</Text>
                            <TextInput
                                placeholder="title"
                                onChangeText={(text)=>this.setState({title:text})}
                                onSubmitEditing={(text)=>this.setState({title:text})}
                                onEndEditing={(event)=>this.setState({title:event.nativeEvent.text})}
                                style={{backgroundColor:'white',height:Height*0.07,width:Width*0.65,marginTop:2}}
                                />
                            <Text style={{fontSize:20,color:'white',marginTop:10}} >Add Details</Text>
                            <TextInput
                                placeholder="datails"
                                onChangeText={(text)=>this.setState({details:text})}
                                onSubmitEditing={(text)=>this.setState({details:text})}
                                onEndEditing={(event)=>this.setState({details:event.nativeEvent.text})}
                                style={{backgroundColor:'white',height:Height*0.07,width:Width*0.65,marginTop:2}}
                                />
                            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginTop:10,width:Width*0.65,height:Height*0.05,backgroundColor:'transparent',position:'relative'}} onPress={this._addNewTask} >
                                <Image source={require('./image/ok.png')} style={{backgroundColor:'#0DA463',width:Width*0.18,height:Width*0.18,borderRadius:250,marginTop:30}}  resizeMethod='auto'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </Overlay>:null
                }
                <ScrollView style={{width:Width,height:Height*0.8}}>
                    <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item,index)=>String(index)}
                    onfresh={this._refreshing}
                    ></FlatList>
                </ScrollView>

                 <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={this._newTask}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                {/* <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
                    <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
                    <Icon name="md-done-all" style={styles.actionButtonIcon} />
                </ActionButton.Item> */}
                </ActionButton>
            </View>
        );
    }
    _setDate=()=>{
        let Day,Month;
        Day=this.refs.calendarStrip.getSelectedDate()._d.getDate();
        Month=this.refs.calendarStrip.getSelectedDate()._d.getMonth();
        Month++;
        this.setState({day:Day,month:Month});
    }
    _newTask=()=>{
        this.setState({isVisible:true});
    }
   _addNewTask=()=>{
    let day,mon;
    day=this.refs.calendarStrip.getSelectedDate()._d.getDate();
    mon=this.refs.calendarStrip.getSelectedDate()._d.getMonth();
    mon++;
       let cc=[...this.state.data,
           {
               title:this.state.title,
               details:this.state.details,
               id:this.state.data.length+1,
               complete:false,
               day:day,
               month:mon,
           }
       ];
       function paixu(a,b){
           if(a.month>b.month)  return 1;
           if(a.month<b.month)  return -1;
           if(a.day>b.day)  return 1;
           return -1;
       }
       cc.sort(paixu);
       this.setState({data:cc,isVisible:false,title:'',details:''});
   }
   _refreshing(){
    let timer= setTimeout(()=>{
      clearTimeout(timer)
    },1500)
  }
  _delete=(index)=>{
            if(this.state.data.length==1)
                this.setState({data:[]})
        else{
            this.state.data.splice(index,1);
            this.setState({data:this.state.data})
        }
    }
   _renderItem=(item)=>{
       return(
    <ScrollView
        horizontal={true}
        snapToStart={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollView =>{
                if(scrollView !== null){
                    setTimeout(()=>{
                        scrollView.scrollTo({x:0,y:0,animated:true},1) 
                    })
        }}}
        >
        <View style={{flexDirection:'row',height:Height*0.1,width:Width*1.25,marginTop:Width*0.01,backgroundColor:'white'}}>
            <View style={{height:Width*0.05,width:Width*0.05,backgroundColor:'#0DA463',borderRadius:250,marginLeft:10,marginTop:Height*0.03}}></View>
            <View style={{height:Height*0.1,width:Width*0.7,justifyContent:'center',marginLeft:10}}>
                <Text style={{fontSize:20,color:'black'}}>{item.item.title}</Text>
                <Text style={{fontSize:10,color:'black',marginLeft:5}}>{item.item.details}</Text>
            </View>
            <View style={{width:Width*0.1,height:Height,flexDirection:'row'}}>
                <Text style={{fontSize:15,color:'black',marginTop:Height*0.035}}>{item.item.day}</Text>
                <Text style={{fontSize:15,color:'black',marginTop:Height*0.035}}>/</Text>
                <Text style={{fontSize:15,color:'black',marginTop:Height*0.035}}>{item.item.month}</Text>
            </View>
            <Image source={require('./image/duoyun.png')} style={{height:Height*0.1,width:Width*0.1,marginRight:5}} resizeMode='contain'></Image>
            <View style={{width:Width*0.25,height:Height*0.1,justifyContent:'center',alignItems:'center',backgroundColor:'#E74C3D'}}>
                <Text style={{fontSize:18,color:'white'}} onPress={(index)=>this._delete(item.index)}>Delete</Text>
            </View>
        </View>
    </ScrollView>
       )
   }
}
const styles=StyleSheet.create({
  container:{
    width:Width,
    height:Height,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  toggleIcon: {
    fontSize: 30,
    color: "#CCC"
    },
})
