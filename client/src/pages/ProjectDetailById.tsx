import { useState, useEffect } from "react";
import { Container, SimpleGrid, Divider, useToast, useDisclosure, Box, Button, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { getShareLinkData } from "../api/open-ai-api";
import { ProjectImage, ProjectInfo, ProjectSteps, ShareModal } from "../components/project-details";
import { RelatedImages, ProjectLocationState } from "../types";

const ProjectDetailById: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(true);
  const [projectExplanation, setProjectExplanation] = useState<string | null>(null);
  const [relatedImages, setRelatedImages] = useState<RelatedImages | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectLocationState | null>(null);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const response = await getShareLinkData(id);
          setProjectExplanation(response.data.explanation);
          setRelatedImages(response.data.projectImage);
          setProject(response.data.projectDetails);
        } else {
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        handleFetchError(error.message, "Data Fetch Error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id, toast]);

  const handleFetchError = (errorMessage: string, title: string) => {
    toast({
      title,
      description: errorMessage,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  if (!project) {
    return (
      <Container maxW={"7xl"} py={{ base: 5, sm: 10 }}>
        <Box p={6} textAlign="center">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            No project details found.
          </Text>
          <Button onClick={() => navigate("/")} variant="outline">
            Go Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW={"7xl"} py={{ base: 5, sm: 10 }}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
        <ProjectImage
          isLoading={isLoading}
          relatedImages={relatedImages}
          projectTitle={project.title}
          onOpen={() => {
            setShareLink(`${import.meta.env.VITE_PROJECT_URL}/project-detail/${id}`);
            onOpen();
          }}
        />
        <ShareModal isOpen={isOpen} onClose={onClose} isSaving={false} shareLink={shareLink} />
        <ProjectInfo isLoading={isLoading} project={project} />
      </SimpleGrid>
      <Divider mt={10} />
      <ProjectSteps isLoading={isLoading} projectExplanation={projectExplanation} />
    </Container>
  );
};

export default ProjectDetailById;