import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DocumentDetail = ({ route }) => {
  // Destructure the document data passed as a prop
  const { doc } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Document Details</Text>
      <Text style={styles.label}>Title: <Text style={styles.value}>{doc.title}</Text></Text>
      <Text style={styles.label}>Type: <Text style={styles.value}>{doc.type}</Text></Text>
      <Text style={styles.label}>Size: <Text style={styles.value}>{doc.size}</Text></Text>
      <Text style={styles.label}>Created At: <Text style={styles.value}>{doc.createdAt}</Text></Text>
      <Text style={styles.label}>Updated At: <Text style={styles.value}>{doc.updatedAt}</Text></Text>
      <Text style={styles.label}>Public: <Text style={styles.value}>{doc.public ? 'Yes' : 'No'}</Text></Text>
      <Text style={styles.label}>Status: <Text style={styles.value}>{doc.status}</Text></Text>
      <Text style={styles.label}>Created By: <Text style={styles.value}>{doc.createdBy}</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  value: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default DocumentDetail;
