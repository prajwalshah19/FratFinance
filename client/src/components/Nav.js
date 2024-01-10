import {useState} from 'react';
import {
    Box,
    Flex,
    Spacer,
    ChakraProvider,
    extendTheme,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Button,
    Icon,
  } from '@chakra-ui/react';

  import { FaBars } from 'react-icons/fa';




function Nav(props) {

    const elements = [
        {
            name: 'Profile',
            ref: '/profile'
        },
        {
            name: 'Budget',
            ref: '/budget'
        },
        {
            name: 'Ledger',
            ref: '/ledger'
        },



    ];

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
      setIsDrawerOpen(true);
    };
  
    const handleDrawerClose = () => {
      setIsDrawerOpen(false);
    };

    return (
        <Box bg={props.secondary} p={4}>
        <Flex>
          <Box p="2" >
            <a href="/">FratFinance</a>
          </Box>
          <Spacer />
          
            {elements.map(x => {
                return (
                    <Box
                    display={{ base: 'none', md: 'block' }}
                    p = "3"
                    fontSize="lg"
                    
                    >
                    <a href={x.ref}>{x.name}</a>
                  </Box>
                )
            })}
        <Box display={{ base: 'block', md: 'none' }}>
        <Button onClick={handleDrawerOpen} leftIcon={<Icon as={FaBars} />}>
        </Button>
        </Box>
        </Flex>

              {/* Drawer for mobile */}
        <Drawer isOpen={isDrawerOpen} placement="right" onClose={handleDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        
      </Box>

    )


}

export default Nav;