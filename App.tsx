import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';

interface Character {
  id: number;
  name: string;
  image: string;
}

const API_URL = 'https://rickandmortyapi.com/api/character';

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);

  const fetchCharacters = async () => {
    const response = await fetch(`${API_URL}?page=${page}`);
    const data = await response.json();
    setCharacters(data.results);
  };

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const handleIncrement = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleDecrement = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const renderItem = ({ item }: { item: Character }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button color="red"title="Decrementar" onPress={handleDecrement} disabled={page === 1} />
        <Text style={styles.pageNumber}>{page}</Text>
        <Button title="Incrementar" onPress={handleIncrement} />
      </View>
      <FlatList
        data={characters}
        keyExtractor={(character) => character.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pageNumber: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;