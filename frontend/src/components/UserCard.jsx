import { Card, CardHeader, Flex, Avatar, Box, Heading, Text, IconButton, CardBody } from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import EditModal from './EditModal';
const UserCard = ({ user }) => {
  return <Card>
    <CardHeader>
      <Flex spacing={4}>
        <Flex flex={"1"} gap={"4"} alignItems={"center"}>
          <Avatar src="https://avatar.iran.liara.run/public" />
          <Box>
            <Heading size='sm'>{user.name}</Heading>
            <Text>{user.role}</Text>
          </Box>
        </Flex>
        <Flex>
          <EditModal size={20} ari/>
          <IconButton
            variant="ghost"
            colorScheme="red"
            size={"sm"}
            aria-label="see menu"
            icon={<BiTrash size={20} />}
          />
        </Flex>
      </Flex>
    </CardHeader>

    <CardBody>
      <Text>{user.description}</Text>
    </CardBody>
  </Card>
}

export default UserCard;