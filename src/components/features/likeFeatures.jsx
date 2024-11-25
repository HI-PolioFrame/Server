import { oriProjects } from "../domain/startProgram.js";

const patchLikesByServer = async (filePath, projectId, userId) => {
    try {
        console.log('Sending request with:', { filePath, projectId, userId });
        const response = await fetch('http://localhost:3000/patch-likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filePath, projectId, userId }),
        });
        
        if (!response.ok) {
          console.error('Response status:', response.status);
          const errorText = await response.text();
          console.error('Error response:', errorText);
        }
      } catch (error) {
        console.error('Detailed error:', error);
      }
}

export const patchLikes = (projectId, userId) => {
    let project = oriProjects.get(projectId);

    if (project.ownerId == userId) {
        console.log("자신의 프로젝트에 좋아요를 누를 수 없음");
        return;
    }

    const FILE_PATH = 'src/components/commmon/dummydata/projectInfo.jsx';
    patchLikesByServer(FILE_PATH, projectId, userId);
}

export const isIncludedLikes = (projectId, userId) => {
    let project = oriProjects.get(projectId);
    if (project['likes'].includes(userId)) {
        return true;
    }
    else return false;
}