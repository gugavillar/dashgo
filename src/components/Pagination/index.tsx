import { Stack, Box, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
    totalCountOfRegisters: number;
    registerPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const sibilinsCount = 1;

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)].map((_, index) => {
        return from + index + 1;
    }).filter(page => page > 0);
}

export function Pagination({
    totalCountOfRegisters,
    registerPerPage = 10,
    currentPage = 1,
    onPageChange
}: PaginationProps) {
    const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage);
    const previousPages = currentPage > 1
        ? generatePagesArray(currentPage - 1 - sibilinsCount, currentPage - 1)
        : [];

    const nextPages = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + sibilinsCount, lastPage))
        : [];
    return (
        <Stack direction={["column", "row"]} spacing="6" mt="8" justify="space-between" align="center">
            <Box>
                <strong>{((currentPage - 1) * registerPerPage) + 1} </strong>
                -
                {currentPage === lastPage ? (<strong> {totalCountOfRegisters} </strong>) : (<strong> {currentPage * registerPerPage} </strong>)}

                de
                <strong> {totalCountOfRegisters}</strong>
            </Box>
            <Stack direction="row" spacing="2">
                {currentPage > (1 + sibilinsCount) && (
                    <>
                        <PaginationItem onPageChange={onPageChange} number={1} />
                        {currentPage > (2 + sibilinsCount) && (
                            <Text color="gray.300" width="8" textAlign="center">...</Text>
                        )}
                    </>
                )}

                {previousPages.length && previousPages.map(page => (
                    <PaginationItem onPageChange={onPageChange} key="page" number={page} />
                ))}

                <PaginationItem onPageChange={onPageChange} isCurrent number={currentPage} />

                {nextPages.length && nextPages.map(page => (
                    <PaginationItem onPageChange={onPageChange} key={page} number={page} />
                ))}

                {(currentPage + sibilinsCount) < lastPage && (
                    <>
                        {(currentPage + 1 + sibilinsCount) < lastPage && (
                            <Text color="gray.300" width="8" textAlign="center">...</Text>
                        )}
                        <PaginationItem onPageChange={onPageChange} number={lastPage} />
                    </>
                )}

            </Stack>
        </Stack>
    )
}