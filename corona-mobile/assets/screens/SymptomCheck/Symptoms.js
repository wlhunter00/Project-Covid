import * as React from "react";
import { StyleSheet, Text, View, Button, ScrollView, Alert } from "react-native";
import { styles, boxStyles } from "./../../styles/styles.js";
import { MultipleChoiceQuestion, ShortAnswerQuestion } from './SurveyQuestion';
import { sendSymptoms } from './../../APIService.js';
import { SurveyButton } from '../../components/Buttons';
import {
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";

export function Symptoms({ changeBackendResponse, changeSurveyDone }) {
  const [response, changeResponse] = React.useState("");
  const [questionNumber, changeQuestionNumber] = React.useState(0);
  const [allAnswers, changeAllAnswers] = React.useState(["", "", "", ""]);

  const advanceQuestionSimple = () => {
    changeQuestionNumber(questionNumber + 1);
  }
  
  const advanceQuestion = (newResponse) => {
    updateAnswer(newResponse);
    changeResponse(allAnswers[0] + " " + allAnswers[1] + " " + allAnswers[2] + " " + allAnswers[3]);
    if (newResponse.trim() != "") {
      changeQuestionNumber(questionNumber + 1);
    }
    else {
      Alert.alert('Please enter an answer before continuing.');
    }
  }

  const advanceQuestionSend = (newResponse) => {
    updateAnswer(newResponse);
    changeResponse(allAnswers[0] + " " + allAnswers[1] + " " + allAnswers[2] + " " + allAnswers[3]);
    if (newResponse.trim() != "") {
      changeQuestionNumber(questionNumber + 1);
      sendSymptoms(response, changeBackendResponse);
      changeSurveyDone(true);
    }
    else {
      Alert.alert('Please enter an answer before continuing.');
    }
  }

  const updateAnswer = (newAnswer) => {
    let newAnswers = [...allAnswers];
    newAnswers[questionNumber-1] = newAnswer;
    changeAllAnswers(newAnswers);
  }

  const goBack = (newResponse) => {
    updateAnswer(newResponse);
    changeQuestionNumber(questionNumber - 1);
  }

  return (
    <ScrollView>
      {questionNumber == 0 && (
        <View style={{ marginTop: 10, marginRight: 5, marginLeft: 5}}>
        <View style={boxStyles.container}>
          <View style={{ alignItems: "center" }}>
            <FontAwesome name="stethoscope" size={100}/>
            <Text style={styles.headerTextBold}>Welcome to Symptom Check</Text>
            <Text style={styles.subtitle}>Here, you can fill out some questions to let us know how you're feeling. We will provide you with information and recommendations based on your responses.</Text>
            <SurveyButton title="Begin" action={advanceQuestionSimple} />
          </View>
        </View>
        </View>
      )}
      {questionNumber == 1 && (
        <View style={{ marginTop: 10, marginRight: 5, marginLeft: 5}}>
          <View style={boxStyles.container}>
            <Text style={styles.boldQuestionText}>Question {questionNumber}/4</Text>
            <ShortAnswerQuestion
              prompt="Could you describe your overall wellness over the past few days? Do you have any unusual symptoms or feel unwell?"
              currResponse={response}
              saveAnswer={advanceQuestion}
              defaultText={allAnswers[questionNumber-1]}
              goBack={goBack} />   
            </View> 
        </View> 
      )}
      {questionNumber == 2 && (
        <View style={{ marginTop: 10, marginRight: 5, marginLeft: 5 }}>
          <View style={boxStyles.container}>
            <Text style={styles.boldQuestionText}>Question {questionNumber}/4</Text>
              <ShortAnswerQuestion
                prompt="Could you please summarize any travel you have done recently?"
                currResponse={response}
                saveAnswer={advanceQuestion}
                defaultText={allAnswers[questionNumber-1]} 
                goBack={goBack} />
          </View>
        </View>
      )
      }
      {questionNumber == 3 && (
        <View style={{ marginTop: 10, marginRight: 5, marginLeft: 5 }}>
          <View style={boxStyles.container}>
            <Text style={styles.boldQuestionText}>Question {questionNumber}/4</Text>
              <ShortAnswerQuestion
                prompt= "Have you had personal interactions with individuals who have traveled recently?"
                currResponse={response}
                saveAnswer={advanceQuestion}
                defaultText={allAnswers[questionNumber-1]} 
                goBack={goBack} />
          </View>
        </View>
      )
      }
      {questionNumber == 4 && (
        <View style={{ marginTop: 10, marginRight: 5, marginLeft: 5 }}>
          <View style={boxStyles.container}>
            <Text style={styles.boldQuestionText}>Question {questionNumber}/4</Text>
              <ShortAnswerQuestion
                prompt="Have you been in any regions with high incidence of COVID-19? To learn more about current COVID-19 incidence, please view the heat map."
                currResponse={response}
                saveAnswer={advanceQuestionSend}
                defaultText={allAnswers[questionNumber-1]} 
                goBack={goBack} />
          </View>
        </View>
      )
      }
    </ScrollView>
  );
}
