import {oriUsers} from "../domain/startProgram.js";
import { userInfo } from "../commmon/dummydata/userInfo.jsx";
import fs from 'fs';
import path from 'path';
import React, { useState } from 'react';

export const isRecruiter = (userId) => {
    let user = oriUsers.get(Number(userId));
    return user.recruiter? true : false;
}

// export const saveContact = (userId) => {
//     let user = oriUsers.get(Number(userId));

//     const filePath = "../components/common/dummydata/userInfo.jsx";

//     // 파일 읽기
//     let fileContent = fs.readFileSync(filePath, 'utf-8');
    
//     // 문자열을 실제 배열로 변환하기 위해 정규식으로 처리
//     const matches = fileContent.match(/userInfo\s*=\s*(\[[\s\S]*?\]);/);
//     if (!matches) {
//       console.log('유저 정보를 찾을 수 없습니다.');
//     }
    
//     // 배열 부분만 추출하여 파싱
//     const arrayString = matches[1];

//     // eval 대신 더 안전한 방법으로 문자열을 객체로 변환
//     const userInfo = JSON.parse(
//         arrayString
//           .replace(/([a-zA-Z0-9_]+):/g, '"$1":') // 프로퍼티 이름을 따옴표로 감싸기
//           .replace(/'/g, '"') // 작은따옴표를 큰따옴표로 변경
//       );
      
//       // 해당 유저 찾아서 contact 증가
//       const updatedUserInfo = userInfo.map(user => {
//         if (user.id === userId) {
//           return {
//             ...user,
//             contact: user.contact + 1
//           };
//         }
//         // return user;
//       });
      
//       // 다시 문자열로 변환
//       const updatedContent = `const userInfo = ${JSON.stringify(updatedUserInfo, null, 2)};`;
//       console.log(updatedContent);
      
//       // 파일에 저장
//       fs.writeFileSync(filePath, updatedContent, 'utf-8');

//     let result = [user.phoneNumber, user.email];
//     return result;
// }

// 현재 userInfo 데이터를 깊은 복사하여 사용
// export const incrementUserContact = (userId) => {
//   try {
//     // userInfo 배열에서 해당 사용자 찾기
//     const userIndex = userInfo.findIndex(user => user.id == userId);
    
//     if (userIndex == -1) {
//       console.log(`❌ 실패: ID ${userId}를 가진 사용자를 찾을 수 없습니다.`);
//       return false;
//     }

//     // 이전 contact 값 저장
//     const previousContact = userInfo[userIndex].contact;
    
//     // contact 값 증가
//     userInfo[userIndex] = {
//       ...userInfo[userIndex],
//       contact: previousContact + 1
//     };
    
//     console.log(`✅ 성공: 사용자 ${userInfo[userIndex].name}의 contact 값이 ${previousContact} → ${userInfo[userIndex].contact}로 증가되었습니다.`);
//     return true;
//   } catch (error) {
//     console.error('❌ 오류 발생:', error);
//     return false;
//   }
// };

// 테스트 함수
// export const testContactUpdate = (userId) => {
//   console.log('테스트 시작...');
//   console.log('====================');
  
//   // 업데이트 전 사용자 정보 출력
//   const beforeUser = userInfo.find(user => user.id == userId);
//   if (!beforeUser) {
//     console.log(`❌ 테스트 실패: ID ${userId}를 가진 사용자를 찾을 수 없습니다.`);
//     return;
//   }
  
//   console.log('업데이트 전 사용자 정보:', {
//     id: beforeUser.id,
//     name: beforeUser.name,
//     contact: beforeUser.contact
//   });
  
//   // contact 값 증가 실행
//   const success = incrementUserContact(userId);
  
//   if (success) {
//     // 업데이트 후 사용자 정보 출력
//     const afterUser = userInfo.find(user => user.id == userId);
//     console.log('업데이트 후 사용자 정보:', {
//       id: afterUser.id,
//       name: afterUser.name,
//       contact: afterUser.contact
//     });
    
//     // 값이 실제로 증가했는지 확인
//     if (afterUser.contact == beforeUser.contact + 1) {
//       console.log('✅ 테스트 성공: contact 값이 정상적으로 증가됨');
//     } else {
//       console.log('❌ 테스트 실패: contact 값이 예상대로 증가하지 않음');
//     }
//   }
  
//   console.log('====================');
// };






// export const incrementUserContact = async (userId) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/users/${userId}/increment-contact`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.error);
//     }

//     const result = await response.json();
//     console.log('✅ 성공:', result.message);
//     return true;
//   } catch (error) {
//     console.error('❌ 오류 발생:', error.message);
//     return false;
//   }
// };

// // 테스트 함수
// export const testContactUpdate = async (userId) => {
//   console.log(`테스트 시작 (userId: ${userId})...`);
//   console.log('====================');
  
//   const success = await incrementUserContact(userId);
  
//   if (success) {
//     console.log('✅ 테스트 완료: userInfo.jsx 파일이 업데이트되었습니다.');
//   } else {
//     console.log('❌ 테스트 실패');
//   }
  
//   console.log('====================');
// };