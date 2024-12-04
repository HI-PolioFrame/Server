import { oriProjects } from "../domain/startProgram";

export const handleImageUpload = async (projectId, field) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = async (event) => {
    const file = event.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("projectId", Number(projectId));
    formData.append("field", field);

    try {
      const response = await fetch("http://localhost:3000/update-project-photo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const result = await response.json();
      console.log("업로드 결과:", result);

      const project = oriProjects.get(projectId);
      if (project) {
        project[field] = result.uploadedPath;
        oriProjects.set(projectId, project);
        console.log("프로젝트 데이터 업데이트 완료:", oriProjects.get(projectId));
      } else {
        console.error("해당 프로젝트를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("이미지 업로드 실패", error);
    }
  };

  input.click();
};


//수연 언니 코드
// export const handleImageUpload = async (projectId, field) => {
//     // 파일 입력 엘리먼트 생성
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';

//     const filePath = "src/components/commmon/dummydata/projectInfo.jsx";
  
//     input.onchange = async (event) => {
//       const file = event.target.files[0];
      
//       const formData = new FormData();
//     formData.append('photo', file);
//     formData.append('filePath', filePath);
//     formData.append('projectId', Number(projectId));
//     formData.append('field', field);

//     try {
//       const response = await fetch('http://localhost:3000/update-project-photo', {
//         method: 'POST',
//         body: formData
//       });

//       const result = await response.json();
//       console.log("result: ", result);

//       let project = oriProjects.get(projectId);
//       project.field = result.uploadedPath;
//       oriProjects.set(projectId, project);
      
//     } catch (error) {
//       console.error('이미지 업로드 실패', error);
//     }
//   };
  
//     // 파일 선택 다이얼로그 오픈
//     input.click();
//   };