import { SafeAreaView, ScrollView } from 'react-native';
import { Button } from '../components/button';
import { styles } from './styles';

function App() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container}>

        <Button>
          Oi Botão!
        </Button>

      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
