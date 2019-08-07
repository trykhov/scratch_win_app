import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Button } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';


let itemArray = new Array(25).fill("empty");

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      randomNum: ""
    }
  };

  // when app loads up
  componentDidMount() {
    // generate random number
    this.setState({ randomNum: this.generateRandomNum() });
  };

  generateRandomNum = () => {
    let randomNum = Math.floor(Math.random() * 25);
    this.setState({ randomNum, isScratched: true });
    // Alert.alert(randomNum);
    return randomNum;
  };

  scratchItem = itemNum => {
    // decide lucky or unlucky
    if(this.state.randomNum === itemNum) {
      itemArray[itemNum] = "lucky";
    } else {
      itemArray[itemNum] = "unlucky"
    }
    this.forceUpdate();
  };

  scratchItemIcon = itemNum => {
    // find right icon
    if(itemArray[itemNum] === "lucky") {
      return "dollar";
    } else if(itemArray[itemNum] === "unlucky") {
      return "frown-o";
    }
    return "circle";
  };

  scratchItemColor = itemNum => {
    // find right color
    if(itemArray[itemNum] === "lucky") {
      return "green";
    } else if(itemArray[itemNum] === "unlucky") {
      return "red";
    }
    return "black";
  };

  showAllItem = () => {
    // reveal all icons
    itemArray.fill("unlucky");
    itemArray[this.state.randomNum] = "lucky";
    this.forceUpdate();
  };

  resetGame = () => {
    this.setState({randomNum: this.generateRandomNum()}, 
    () => {
      itemArray.fill("empty");
      this.forceUpdate();
    });
  };

  generateRow = (start) => {
    let row = [];
    for(let i = start; i < start + 5; i++) {
      row.push(
        <TouchableOpacity 
              key={i}
              style={styles.item}
              onPress={() => {
                this.scratchItem(i);
              }}  
            >
              <FontAwesome 
                name={this.scratchItemIcon(i)}
                size={50}
                color={this.scratchItemColor(i)}  
              />
            </TouchableOpacity>
      )
    }
    return row;
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topText}>Scratch and Win</Text>
        </View>
        <View style={styles.grid}>
          <View style={styles.itemRow}>
            {this.generateRow(0)}
          </View>
          <View style={styles.itemRow}>
            {this.generateRow(5)}
          </View>
          <View style={styles.itemRow}>
            {this.generateRow(10)}
          </View>
          <View style={styles.itemRow}>
            {this.generateRow(15)}
          </View>
          <View style={styles.itemRow}>
            {this.generateRow(20)}
          </View>
        </View>
        <Button full success style={styles.button} onPress={() => this.showAllItem()}>
          <Text style={styles.buttonText}>Show all coupons</Text>
        </Button>
        <Button full primary style={styles.button} onPress={() => this.resetGame()}>
          <Text style={styles.buttonText}>Reset</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {

  },
  itemRow: {
    flexDirection: "row"
  },
  item: {
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#000",
    minWidth: 70
  },
  button: {
    marginVertical: 15
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  topBar: {
    backgroundColor: "#8B78E6",
    height: 50,
    justifyContent: "center",
    width: Dimensions.get("window").width,
    marginVertical: 20
  },
  topText: {
    color: "#FFF",
    textAlign: "center"
  }
});
