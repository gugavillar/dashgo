import { Box, Flex, Avatar, Text } from '@chakra-ui/react';

export function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Gustavo Villar</Text>
                <Text color="gray.300" fontSize="small">grsv.21@gmail.com</Text>
            </Box>
            <Avatar size="md" name="Gustavo Villar" src="https://github.com/gugavillar.png" />
        </Flex>
    );
}