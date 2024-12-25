import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import axios from 'axios';
import {format} from 'date-fns';

const HistoryView = ({navigation}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async page => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://iot-deploy.onrender.com/api/user/warnings?page=${page}&page_size=10`,
      );
      const newData = response.data.data; // Giả sử API trả về dữ liệu trong thuộc tính `data`
      console.log('newData', newData);
      setData(newData);
      setHasMore(page < response.data.total_pages); // Kiểm tra xem có trang tiếp theo không
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const formatDate = date => {
    return format(new Date(date), 'dd-MM-yyyy HH:mm');
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử người lạ cố gắng thâm nhập</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>STT</Text>
        <Text style={styles.headerText}>Tên</Text>
        <Text style={styles.headerText}>Thời Gian</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.tableRow}
            onPress={() =>
              navigation.navigate('Detail', {
                name: item.name,
                time: formatDate(item.timestamp),
                image: item.image,
              })
            }>
            <Text style={styles.cell}>{(page - 1) * 10 + index + 1}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{formatDate(item.timestamp)}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      <View style={styles.pagination}>
        <Button
          title="Trang trước"
          onPress={handlePreviousPage}
          disabled={page === 1}
        />
        <Button
          title="Trang sau"
          onPress={handleNextPage}
          disabled={!hasMore}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#b8b8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default HistoryView;
