import { Box, Flex, Avatar, Text } from '@chakra-ui/react';

interface ProfileProps {
    showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && <Box mr="4" textAlign="right">
                <Text>Gustavo Villar</Text>
                <Text color="gray.300" fontSize="small">grsv.21@gmail.com</Text>
            </Box>}
            <Avatar size="md" name="Gustavo Villar" src="https://github.com/gugavillar.png" />
        </Flex>
    );
}