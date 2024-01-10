import { Box, Text, Input, Button, Heading} from "@chakra-ui/react"
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'




function Login(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const onEnterClicked = () => navigate('/home')

    return (
        <Box
        maxW="md"
        mx="auto"
        mt={8}
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bg={props.secondary}
      >
        <Text as="h1" fontSize='3xl' mt = {6} mb={4} textAlign="center" >
          Login
        </Text>

        <Input placeholder="Username" mb={4} bg = {props.secondary} width = "100%" />
        <Input placeholder="Password" mb={4} bg = {props.secondary} width = "100%" />
        {/* You can replace the Input component with a PasswordInput component for password entry */}
        {/* <PasswordInput placeholder="Password" mb={4} /> */}
          <Button onClick = {onEnterClicked} colorScheme="gray" width="full" mb = {10}>
            Log In
          </Button>
      </Box>

    )


}

export default Login;