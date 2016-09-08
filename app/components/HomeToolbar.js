import React from 'react'
import { Text, StyleSheet } from 'react-native'

function getMonthName() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
  const d = new Date();
  return monthNames[d.getMonth()]
}

export default HomeToolbar = () => <Text style={styles.monthTitle}>{getMonthName()}</Text>

const styles = StyleSheet.create({
  monthTitle: {
    fontSize: 18,
    textAlign:'center',
    fontWeight: '300',
    color:'#fff',
  }
})
