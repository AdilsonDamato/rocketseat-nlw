import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Image,
  Text,
  ImageBackground 
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

//Interface UF
interface UF {
  sigla: string;
}

//Interdace City
interface City {
  nome: string;
}

const Home = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios.get<UF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);
      
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios.get<City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome);

      setCities(cityNames);
    });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity
    });
  }

  function handleSelectUf(value: any) {
    setSelectedUf(value);
  }

  function handleSelectCity(value: any) {
    setSelectedCity(value);
  }

  return (
    <ImageBackground 
      style={styles.container}
      source={require('../../assets/home-background.png')}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>
          Seu marketplace de coleta de resíduos
        </Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View>
        <RNPickerSelect
          placeholder={{
            label: "Selecione uma UF",
            value: null,
            color: "#9EA0A4",
          }}
          value={selectedUf}
          onValueChange={(value) => handleSelectUf(value)}
          items={ufs.map((uf) => {
            return {
              label: uf,
              value: uf,
            };
          })}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 12,
              right: 12,
            },
          }}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return <Icon name="arrow-down" size={24} color="#9EA0A4" />;
          }}
        />
        <RNPickerSelect
          placeholder={{
            label: "Selecione uma cidade",
            value: null,
            color: "#9EA0A4",
          }}
          value={selectedCity}
          onValueChange={(value) => handleSelectCity(value)}
          items={cities.map((city) => {
            return {
              label: city,
              value: city,
            };
          })}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 12,
              right: 12,
            },
          }}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return <Icon name="arrow-down" size={24} color="#9EA0A4" />;
          }}
        />
      </View>

      <View style={styles.footer}>
        <RectButton 
          style={styles.button}
          onPress={handleNavigateToPoints}
        >
          <View style={styles.buttonIcon}>
            <Text>
              <Icon 
                name="arrow-right"
                color="#FFF"
                size={24}
              />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#6C6C80',
    paddingRight: 30,
    marginBottom: 8,
    height: 50,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0,
    borderRadius: 10,
    color: '#6C6C80',
    paddingRight: 30,
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
});

export default Home;