import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
    isCurrent?: boolean;
    number: number;
    onPageChange: (page: number) => void;
}

export function PaginationItem({ isCurrent = false, number, onPageChange }: PaginationItemProps) {
    if (isCurrent) {
        return (
            <Button
                size="sm"
                fontSize="xs"
                colorScheme="pink"
                width="4"
                disabled
                _disabled={{
                    bg:
                        'pink.500',
                    cursor:
                        'default'
                }}>
                {number}
            </Button>
        )
    }
    return (
        <Button
            size="sm"
            fontSize="xs"
            bg="gray.700"
            width="4"
            _hover={{
                bg: 'gray.500'
            }}
            onClick={() => onPageChange(number)}>
            {number}
        </Button>
    )
}