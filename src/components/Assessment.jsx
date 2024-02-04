import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useUser } from '../userContext.jsx';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png';
// import {FaceDetectionComponent} from './FaceDetectionComponent.jsx';
import {
  VStack,
  Button,
  Text,
  Image,
  Container,
  Box,
  Flex,
} from '@chakra-ui/react';
import {Sidebar} from '../components/Sidebar.jsx';
import {Rules} from '../components/Rules.jsx';
import {QuestionsForm} from '../components/QuestionsForm.jsx';

export const Assessment = () => {
  const questionsWithOptions1 = {
    "Overall how would you rate your mental health?": {
      'Excellent': 4,
      'Somewhat good': 3,
      'Average': 2,
      'Somewhat poor': 1,
      'Poor': 0
    },
    "During the past 4 weeks, have you had any problems with your work or daily life due to any emotional problems, such as feeling depressed, sad or anxious?": {
      'Yes': 0,
      'Some sort': 1,
      'Not sure': 2,
      'May be once or twice': 3,
      'Not at all': 4
    },
    "During the past 4 weeks, how often has your mental health affected your ability to get work done?": {
      'Very often': 0,
      'Somewhat often': 1,
      'May be once or twice': 2,
      'Not so often': 3,
      'Not at all': 4
    },
    "Have you felt particularly low or down for more than 2 weeks in a row?": {
      'Very often': 0,
      'Somewhat often': 1,
      'May be once or twice': 2,
      'Not so often': 3,
      'Not at all': 4
    },
    "During the past two weeks, how often has your mental health affected your relationships?": {
      'Very often': 0,
      'Somewhat often': 1,
      'May be once or twice': 2,
      'Not so often': 3,
      'Not at all': 4
    },
    "During the past 4 weeks, do you think you are going through a tough emotional situation?": {
      'Yes Extremely': 0,
      'Some sort of': 1,
      'May be once or twice': 2,
      'Have to think': 3,
      'Not at all': 4
    },
    "During the past 4 weeks, how often did you get agitated?": {
      'Very often': 0,
      'Somewhat often': 1,
      'May be once or twice': 2,
      'Not so often': 3,
      'Not at all': 4
    }
  }

  
  const questionsWithOptions2 = {
    "I found it hard to wind down": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I was aware of dryness of my mouth": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I couldn’t seem to experience any positive feeling at all": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I found it difficult to work up the initiative to do things": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I tended to over-react to situations": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I experienced trembling (e.g. in the hands)": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I felt that I was using a lot of nervous energy": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I was worried about situations in which I might panic and make a fool of myself": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I felt that I had nothing to look forward to": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I found myself getting agitated": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I found it difficult to relax": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I felt down-hearted and blue": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I was intolerant of anything that kept me from getting on with what I was doing": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I felt I was close to panic": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I was unable to become enthusiastic about anything": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I felt I wasn’t worth much as a person": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I felt that I was rather touchy": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I felt scared without any good reason": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
    "I felt that life was meaningless": { 'Strongly Disagree': 0, 'Disagree': 0.33, 'Neutral': 0.67, 'Agree': 1, 'Strongly Agree': 1.34 },
  };
  



  const determineQuestionsDataset = (stage) => {
    if (stage === 0 || stage === 1) {
      return questionsWithOptions1;
    } else if (stage === 2) {
      return questionsWithOptions2;
    }
    
    return {};
  };

  const { userId } = useUser();
  const [userinfo, setUserinfo] = useState();
  const [questionsWithOptions, setQuestionsWithOptions] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const history = useHistory();
  const [alertDisplayed, setAlertDisplayed] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUserInfo = await axios.get(`/userdata/${userId}`);

        setUserinfo(responseUserInfo.data);
        const dataset = determineQuestionsDataset(userinfo && userinfo.stage);
        setQuestionsWithOptions(dataset);
        setQuestions(Object.keys(dataset));
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, userinfo]);



  useEffect(() => {
    if (isTimerRunning) {
      const timerInterval = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          setIsTimerRunning(false);
          clearInterval(timerInterval);
          handleRestartTest();
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timer, isTimerRunning]);

  const handleOptionChange = (value) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = value;
    setSelectedOptions(updatedOptions);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleSubmission = async () => {
    try {
      let response;
  
      if (userinfo.stage === 1 || userinfo.stage === 0) {
        response = await axios.post(`/assessment-test/${userId}`, {
          selectedOptions,
        });
      } else {
        response = await axios.post(`/assessment2-test/${userId}`, {
          selectedOptions,
        });
      }
  
      if (response.status === 200) {
        console.log('Personality test data submitted successfully!');
        // Redirect to the next page after submission
        Swal.fire({
          icon: 'success',
          title: 'Test Submitted Successfully!',
          text: `Thank you! You have successfully completed Stage ${userinfo.stage}.`,
        });
  
        // Reload the page after redirection
        window.location.reload();
        history.push('/intake-form');
  
        // Resolve the promise with the success message
        return Promise.resolve('Test submitted successfully');
      } else {
        console.error('Error submitting test data:', response.statusText);
        // Reject the promise with the error message
        return Promise.reject(`Error submitting test data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting test data:', error.message);
      // Reject the promise with the error message
      return Promise.reject(`Error submitting test data: ${error.message}`);
    }
  };
  

  const startTest = () => {
    setTestStarted(true);
    setIsTimerRunning(true);
  };

  const handleRestartTest = () => {
    setTimer(600);
    setIsTimerRunning(false);
    setTestStarted(false);
    setAgreementChecked(false);
    setCurrentQuestion(0);
    setSelectedOptions(Array(questions.length).fill(null));
  };


  useEffect(() => {
    if (userinfo?.stage === 1 && !alertDisplayed) {
      // Alert that the user has already completed the assessment
      Swal.fire({
        icon: 'info',
        title: 'Previous Assessment Completed',
        text: 'You have already completed the previous assessment. Only proceed with this assessment if you feel it is necessary.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Got it!',
      });
      setAlertDisplayed(true);
    }
  }, [userinfo, alertDisplayed]);
  

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minH="100vh" bgGradient="linear(to-r, #89f7fe, #66a6ff)" color="white">
    {/* Sidebar component */}
    <Sidebar display={{ base: 'none', md: 'solid' }} />

    <Flex flex="1" direction="column" p="8" ml={{ base: '0', md: '260px' }}>
      {/* PersonalityTest Box */}
      <Box p="6" bg="white" borderRadius="md" boxShadow="md" mb="4" id="PersonalityTest">
        <Container maxW="xl" centerContent>
          <Box
            display={{ base: 'block', md: 'flex' }}
            justifyContent="center"
            p={3}
            bg={'white'}
            w="100%"
            m={{ base: '40px 0 15px 0', md: '20px 0 15px 0' }}
            borderRadius="lg"
            borderWidth="1px"
          >
            <Text fontSize={{ base: 'xl', md: '4xl' }} fontFamily="Work Sans" color="black">
              Mental Assessment(Stage: {userinfo && userinfo.stage})
            </Text>
          </Box>
        </Container>

        <VStack align="center" spacing="4" mt="4">
          <Image src={logo} alt="Logo" boxSize="200px" objectFit="cover" borderRadius="full" />

          {/* Conditionally render the Rules component based on the stage */}
          {(userinfo?.stage === 0 || userinfo?.stage === 1 || userinfo?.stage === 2) && !testStarted && (
            <Rules agreementChecked={agreementChecked} onAgreementChange={setAgreementChecked} />
          )}

          {/* Conditionally render the QuestionsForm component */}
          {testStarted && currentQuestion < questions.length && (
            <QuestionsForm
              currentQuestion={currentQuestion}
              questions={questions}
              options={questionsWithOptions[questions[currentQuestion]]}
              selectedOptions={selectedOptions}
              onOptionChange={handleOptionChange}
              onNextQuestion={handleNextQuestion}
              onSubmit={handleSubmission}
              timer={timer}
              userinfo={userinfo}
            />
          )}

          {/* Conditionally render the Start Test button */}
          {(userinfo?.stage === 0 || userinfo?.stage === 1 || userinfo?.stage === 2) && !testStarted && (
            <Button colorScheme="teal" onClick={startTest} isDisabled={!agreementChecked} mt="4">
              Start Test
            </Button>
          )}
        </VStack>

        {/* Existing code */}
        <Box p="6" bg="white" borderRadius="md" boxShadow="md" mb="4" id="PersonalityTest">
          {userinfo && userinfo.stage === 3 && (
            <Box
              p="2"
              bg="teal.500"
              color="white"
              borderRadius="md"
              textAlign="center"
              fontWeight="bold"
              fontSize="lg"
              mt="4"
            >
              Test Completed!
            </Box>
          )}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        textAlign="center"
        p="2"
        mt={{ base: 5, md: 5 }}
        bg="gray.100"
        borderRadius="md"
        boxShadow="md"
        ml={{ base: 1, md: 300 }}
        mr={{ base: 1, md: 300 }}
        mb={{ base: 5, md: 5 }}
        fontSize={{ base: "xs", md: "sm" }}
      >
        {/* Links to terms, privacy, and refund policies */}
        <Text color="gray.500" display="inline" mr={3}>
          <Link  to="/terms">
            Terms and Conditions
          </Link>
        </Text>
        <Text color="gray.500" display="inline" mr={3}>
          <Link  to="/privacy">
            Privacy policy
          </Link>
        </Text>
        <Text color="gray.500" display="inline">
          <Link  to="/refund">
            Refund policy
          </Link>
        </Text>

        {/* Copyright information */}
        <Text fontSize="sm" color="gray.700" mt={{ base: 2, md: 0 }} display="block">
          <Link  to="/" textDecoration="none" color="gray.700">
            &copy;2024 Eunoia. All rights reserved.
          </Link>
        </Text>
      </Box>
    </Flex>
  </Flex>
);
};