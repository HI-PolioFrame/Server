const fs = require('fs');
const path = require('path');

// 파일 수 읽기
// filePath로 입력된 파일을 모두 읽어 Number로 변환해 반환한다.
const readNumberFromFile = (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('파일을 읽는 중 오류가 발생했습니다:', err);
            return;
        }

        // 파일 내용에서 숫자를 Number로 변환
        const number = Number(data.trim()); // 공백 제거 후 숫자로 변환
        return number;
    });
}

// 파일 내용 다 지우기
const truncateFile = (filePath) => {
    fs.truncate(filePath, 0, (err) => {
        if (err) {
            console.error('파일을 비우는 중 오류가 발생했습니다:', err);
            return;
        }
    });
}

// 파일에 글 추가
// filePath로 입력된 파일 뒤에 이어서 string을 입력한다.
const appendStringToFile = (filePath, string) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('파일을 읽는 중 오류가 발생했습니다:', err);
            return;
        }

        // 기존 데이터에 새로운 문자열 추가
        const newData = data + string;

        // 파일 다시 쓰기
        fs.writeFile(filePath, newData, 'utf8', (err) => {
            if (err) {
                console.error('파일을 저장하는 중 오류가 발생했습니다:', err);
            }
        });
    });
}

// 파일 뒷부분 삭제
// filePath로 입력된 파일 뒤에서 numCharsToRemove만큼 삭제한다.
const removeFromFileEnd = (filePath, numCharsToRemove) => {
    // 파일 읽기
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('파일을 읽는 중 오류가 발생했습니다:', err);
            return;
        }

        // 파일 크기에서 numCharsToRemove만큼 잘라내기
        const newData = data.slice(0, -numCharsToRemove);

        // 잘라낸 데이터를 다시 파일에 쓰기
        fs.writeFile(filePath, newData, 'utf8', (err) => {
            if (err) {
                console.error('파일을 쓰는 중 오류가 발생했습니다:', err);
            }
        });
    });
};

// 파일 크기를 KB, MB 단위로 변환하여 나타내는 메소드
const getFileSize = (number) => {
    if(number < 1024) {      
        return number + 'bytes';    
    } else if(number > 1024 && number < 1048576) {
          return (number/1024).toFixed(1) + 'KB';    
    } else if(number > 1048576) {      
        return (number/1048576).toFixed(1) + 'MB';    
    }
}

export { readNumberFromFile, truncateFile, appendStringToFile, removeFromFileEnd, getFileSize };