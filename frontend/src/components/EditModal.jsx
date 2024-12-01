import { Button, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, FormControl, FormLabel, Input, Textarea, RadioGroup, Radio, ModalFooter, IconButton} from '@chakra-ui/react';
import { BiEditAlt } from 'react-icons/bi';  
const EditModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return <>
		<IconButton
			onClick={onOpen}
			variant='ghost'
			colorScheme='blue'
			aria-label='See menu'
			size={"sm"}
			icon={<BiEditAlt size={20} />}
		/>

    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>My Friend 🫡</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex alignItems={"center"} gap={4}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input placeholder="John Doe"/>
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input placeholder="Software Engineer"/>
            </FormControl>
          </Flex>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              resize={"none"}
              overflowY={"hidden"}
              placeholder="He is a software enginner who want to change the world"
            />
          </FormControl>

          <RadioGroup mt={4}>
            <Flex gap={5}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Flex>
          </RadioGroup>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Update
          </Button>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export default EditModal;