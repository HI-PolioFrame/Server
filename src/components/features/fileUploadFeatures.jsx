import { oriProjects } from "../domain/startProgram";

export const handleImageUpload = async (projectId, field) => {
    // 파일 입력 엘리먼트 생성
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    const filePath = "src/components/commmon/dummydata/projectInfo.jsx";
  
    input.onchange = async (event) => {
      const file = event.target.files[0];
      
      const formData = new FormData();
    formData.append('photo', file);
    formData.append('filePath', filePath);
    formData.append('projectId', Number(projectId));
    formData.append('field', field);

    try {
      const response = await fetch('http://localhost:3000/update-project-photo', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('이미지 업로드 실패', error);
    }
  };
  
    // 파일 선택 다이얼로그 오픈
    input.click();
  };