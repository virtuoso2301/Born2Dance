import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const style = StyleSheet.create({
  view: {
    backgroundColor: '#0E172A',
    flex: 1,
    padding: '3%',
  },
  questionCount: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.24,
    color: '#BABFC8',
  },
  questionFormHeader: {
    paddingVertical: '3%',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  questionFormDescription: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.24,
    color: '#BABFC8',
  },
  question: {
    paddingVertical: '10%',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  input: {
    color: '#FFFFFF',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#334155',
    padding: '4%',
    marginBottom: '3%',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  successImage: {
    marginTop: '30%',
    alignSelf: 'center',
    height: 300,
    // aspectRatio: 4,
  },
  thankYouText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    padding: '3%',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
  },
  thankYouDescription: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
  },
});

export const RequestUs = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const [apiRequest, setApiRequest] = useState({});
  const [apiSuccess, setApiSuccess] = useState(true);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const getRequestUsAPI = async () => {
    try {
      const resp = await getRequestUs();
      setQuestions(resp.data);
      setSelectedQuestion(resp.data[0]);
      setSelectedQuestionIndex(0);
    } catch (error) {}
  };

  useEffect(() => {
    getRequestUsAPI();
  }, []);

  return (
    <ScrollView style={style.view}>
      {!apiSuccess && (
        <>
          <Text style={style.questionCount}>
            Question {selectedQuestionIndex + 1} of {questions.length}
          </Text>
          <Text style={style.questionFormHeader}>Request Form</Text>
          <Text style={style.questionFormDescription}>
            Please answer the following question so the we can reach to you.
          </Text>
          <Text style={style.question}>Who you are?</Text>
          <View>
            {selectedQuestion?.options?.length === 0 ? (
              <TextInput
                autoCapitalize="none"
                style={style.input}
                onChangeText={text => {
                  console.log('text :>> ', text);
                }}
                defaultValue={'abcd'}
                placeholderTextColor="#FFFFFF"
              />
            ) : (
              <Dropdown
                style={[style.input, isFocus && { borderColor: '#334155' }]}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            )}
          </View>
        </>
      )}
      {apiSuccess && (
        <>
          <View style={style.successImage}>
            <Image source={require('../../assets/images/success.png')} />
          </View>
          <Text style={style.thankYouText}>Thankyou!!</Text>
          <Text style={style.thankYouDescription}>
            You have submittted your details in the form. We’ll back to you
            shortly.
          </Text>
        </>
      )}
    </ScrollView>
  );
};
