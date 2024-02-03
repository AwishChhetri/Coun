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
      'Excellent': 0,
      'Somewhat good': 1,
      'Average': 2,
      'Somewhat poor': 3,
      'Poor': 4
    },
    "During the past 4 weeks, have you had any problems with your work or daily life due to any emotional problems, such as feeling depressed, sad or anxious?": {
      'Yes': 4,
      'Some sort': 3,
      'Not sure': 2,
      'May be once or twice': 1,
      'Not at all': 0
    },
    "During the past 4 weeks, how often has your mental health affected your ability to get work done?": {
      'Very often': 4,
      'Somewhat often': 3,
      'May be once or twice': 2,
      'Not so often': 1,
      'Not at all': 0
    },
    "Have you felt particularly low or down for more than 2 weeks in a row?": {
      'Very often': 4,
      'Somewhat often': 3,
      'May be once or twice': 2,
      'Not so often': 1,
      'Not at all': 0
    },
    "During the past two weeks, how often has your mental health affected your relationships?": {
      'Very often': 4,
      'Somewhat often': 3,
      'May be once or twice': 2,
      'Not so often': 1,
      'Not at all': 0
    },
    "During the past 4 weeks, do you think you are going through a tough emotional situation?": {
      'Yes Extremely': 4,
      'Some sort of': 3,
      'May be once or twice': 2,
      'Have to think': 1,
      'Not at all': 0
    },
    "During the past 4 weeks, how often did you get agitated?": {
      'Very often': 4,
      'Somewhat often': 3,
      'May be once or twice': 2,
      'Not so often': 1,
      'Not at all': 0
    }
  }

  const questionsWithOptions2 = {
    "I found it hard to wind down": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I was aware of dryness of my mouth": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I couldn’t seem to experience any positive feeling at all": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I found it difficult to work up the initiative to do things": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I tended to over-react to situations": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I experienced trembling (e.g. in the hands)": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I felt that I was using a lot of nervous energy": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I was worried about situations in which I might panic and make a fool of myself": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I felt that I had nothing to look forward to": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I found myself getting agitated": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I found it difficult to relax": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I felt down-hearted and blue": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I was intolerant of anything that kept me from getting on with what I was doing": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I felt I was close to panic": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I was unable to become enthusiastic about anything": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I felt I wasn’t worth much as a person": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I felt that I was rather touchy": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I felt scared without any good reason": { '0': 4, '1': 3, '2': 2, '3': 1 },
    "I felt that life was meaningless": { '0': 4, '1': 3, '2': 2, '3': 1 },
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
      if (userinfo.stage === 1 || userinfo.stage === 0) {
        const response = await axios.post(`/assessment-test/${userId}`, {
          selectedOptions,
        });
  
        if (response.status === 200) {
          console.log('Personality test data submitted successfully!');
          // Redirect to the next page after submission
          Swal.fire({
            icon: 'success',
            title: 'Test Submitted Successfully!',
            text: 'Thank you! You have successfully completed Stage 1.',
          });
          
          // Reload the page after redirection
          window.location.reload();
          history.push('/intake-form');
        } else {
          console.error('Error submitting test data:', response.statusText);
        }
      } else {
        const response = await axios.post(`/assessment2-test/${userId}`, {
          selectedOptions,
        });
  
        if (response.status === 200) {
          console.log('Personality test data submitted successfully!');
          Swal.fire({
            icon: 'success',
            title: 'Test Submitted Successfully!',
            text: 'Thank you! You have successfully completed Stage 2.',
          });
          // Redirect to the next page after submission
          history.push('/intake-form');
          // Reload the page after redirection
          
        } else {
          console.error('Error submitting test data:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error submitting test data:', error.message);
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

  

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minH="100vh" bgGradient="linear(to-r, #89f7fe, #66a6ff)" color="white">
    <Sidebar display={{ base: 'none', md: 'solid' }} />
    <Flex flex="1" direction="column" p="8" ml={{ base: '0', md: '260px' }}>
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

  {/* Conditionally render the Rules component */}
  {!testStarted && !userinfo?.stage && (
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
  {!testStarted && !userinfo?.stage && (
    <Button colorScheme="teal" onClick={startTest} isDisabled={!agreementChecked} mt="4">
      Start Test
    </Button>
  )}
</VStack>

        <Box p="6" bg="white" borderRadius="md" boxShadow="md" mb="4" id="PersonalityTest">
        {/* Existing code */}
        {userinfo && userinfo.stage=== 3 && (
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
        {/* Remaining code */}
      </Box>
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
      >
        <Text fontSize="sm" color="gray.500" display="inline" mr={3}>
          <Link as={Link} to="/terms">
            Terms and Conditions
          </Link>
        </Text>
        <Text fontSize="sm" color="gray.500" display="inline" mr={3}>
          <Link as={Link} to="/privacy">
            Privacy policy
          </Link>
        </Text>
        <Text fontSize="sm" color="gray.500" display="inline">
          <Link as={Link} to="/refund">
            Refund policy
          </Link>
        </Text>
        <Text fontSize="sm" color="gray.700" mt={{ base: 2, md: 0 }} display="block">
          <Link as={Link} to="/" textDecoration="none" color="gray.700">
            &copy;2024 Eunoia. All rights reserved.
          </Link>
        </Text>
      </Box>
    </Flex>
  </Flex>
);
};