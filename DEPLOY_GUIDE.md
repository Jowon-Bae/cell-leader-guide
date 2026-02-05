
# 📱 셀장 가이드 앱 배포 및 사용 방법

이 앱을 다른 사람들이 사용하게 하려면 **인터넷에 올려야(호스팅)** 합니다. 가장 추천하는 방법은 **GitHub Pages** (무료)를 사용하는 것입니다.

## 1. GitHub에 업로드하기 (PC에서)
1. GitHub 계정이 없다면 [GitHub.com](https://github.com)에서 가입합니다.
2. 새 Repository (저장소)를 만듭니다 (예: `cell-leader-guide`).
3. 터미널에서 다음 명령어를 입력하여 코드를 업로드합니다.

```bash
# 1. git 초기화 (이미 되어 있다면 생략)
git init

# 2. 모든 파일 추가
git add .

# 3. 커밋 (저장)
git commit -m "Initial commit for Cell Leader App"

# 4. 원격 저장소 연결 (GitHub에서 생성한 주소로 변경하세요!)
# 예: git remote add origin https://github.com/YOUR_ID/cell-leader-guide.git

# 5. 업로드 (Push)
git push -u origin main
```

## 2. GitHub Pages 활성화 (자동 배포)
1. GitHub 저장소 페이지의 **Settings (설정)** 탭으로 이동합니다.
2. 좌측 메뉴에서 **Pages**를 클릭합니다.
3. **Branch** 설정에서 `main`을 선택하고 Save를 누릅니다.
4. 잠시 기다리면 **"Your site is live at..."** 라는 메시지와 함께 **주소(URL)**가 생깁니다.
   - 예: `https://your-id.github.io/cell-leader-guide`

## 3. 다른 사람에게 공유하기
- 생성된 **URL 링크**를 카카오톡이나 문자로 셀장님들에게 보내주세요.
- 아이폰/안드로이드 모두 링크를 클릭하면 앱이 열립니다.

## 4. 앱으로 설치하기 (PWA)
이 앱은 **PWA (Progressive Web App)** 기술이 적용되어 있어, 다운로드 없이 앱처럼 설치할 수 있습니다.

**[아이폰 (iOS)]**
1. 사파리(Safari) 브라우저로 링크 접속
2. 하단 **공유 버튼** (네모 위 화살표) 클릭
3. **'홈 화면에 추가'** 선택
4. 홈 화면에 아이콘이 생깁니다.

**[안드로이드 (Galaxy)]**
1. 크롬(Chrome) 브라우저로 링크 접속
2. 상단 점 3개 메뉴 클릭
3. **'앱 설치'** 또는 **'홈 화면에 추가'** 선택
4. 홈 화면에 아이콘이 생깁니다.
