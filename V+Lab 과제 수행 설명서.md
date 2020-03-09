# **V+ Lab 업무 능력 평가 과제**

-------------

**Task1** `프로젝트 파일 구조를 tree 형태로 보여주는 웹 UI를 구현하라.`

**Task2** `tree 에서 각 원소를 삭제하는 기능을 추가하라`

---------

주어진 과제를 해결하기 위해 선택한 자바스크립트 라이브러리는 **React**입니다. 

-----------

**준비**

1. **npm 설치**

2. **npx 설치**
- npm i npx -g
  
3. **react 프로젝트 생성** 

   - npx create-react-app vplus_assignment

4. **jsTree 모듈 설치**

   - npm install react-simple-jstree

5. **jsTree 모듈을 사용하기 위해 Tree.js에 import** 
- **import** TreeView **from** 'react-simple-jstree';
  
6. **jquery 모듈 설치**

   - npm install jquery

7. **jquery 모듈을 사용하기 위해 Tree.js에 import**
- import * as $ from 'jquery'
  
8. **icon 이미지 다운로드하고 저장**

   - 다운로드 사이트 : www.flaticon.com/

   - 설치 경로 : vplus_assignment/public/assets/images/
   - 이미지 크기 : 16 x 16
   - ![K-010](https://user-images.githubusercontent.com/52457180/76151136-fbbd5f00-60f4-11ea-95b1-6691fb54baa2.png)

---------------------

**설명**

1. **핵심 코드는 /src/components/Tree.js 만 보면 된다.** 

2. **어떤 App을 이루고 있는 여러 컴포넌트 중에 tree 컴포넌트가 있을 것이기 때문에 Tree.js로 따로 관리해준다. 그리고 App.js에서는 필요한 component를 조립해준다.** 

   ![K-001](https://user-images.githubusercontent.com/52457180/76152406-9f613c00-6102-11ea-8025-5ad173a00908.png)

3. **하드 코딩된 파일 트리 구조**

   ```javascript
      const jsonData = [
               {
                   "text": "example",
                   "type": "project",
                   "state": { "opened": true },
                   "children": [
                       {
                           "text": "dir1",
                           "type": "folder",
                           "state": { "opened": true },
                           "children": [
                               {
                                   "text": "dir1-1",
                                   "type": "folder",
                                   "state": { "opened": true },
                                   "children": [
                                       {
                                           "text": "file1.c",
                                           "type": "c_file",
                                       }
                                   ]
                               },
                               {
                                   "text": "file2.c",
                                   "type": "c_file",
                               }
                           ]
                       },
                       {
                           "text": "dir2",
                           "type": "folder",
                           "state": { "opened": true },
                           "children": [
                               {
                                   "text": "file3.c",
                                   "type": "c_file",
                               }
                           ]
                       }
                   ]
               }
           ]
   ```
   
4. **Tree.js 의 대략적인 코드**

   ![K-002](https://user-images.githubusercontent.com/52457180/76152573-53af9200-6104-11ea-8ae4-254fbfc0250f.png)

5. **function showContextMenu()** : 트리의 노드를 우클릭 했을 때 나오는 context 메뉴를 custom하는 부분 - **노드 삭제 기능**만 있음.

   ```javascript
   function showContextMenu(node) {
       return {
           delete: { // 노드 삭제 기능
               "label": "Delete " + node.text,
               icon: "./assets/images/delete.png",
               "action": function (obj) {
                   var tree = $('.jstree').jstree();
                   tree.delete_node(node);
               }
           }
       };
   }
   ```

6. **state** : 트리에 대한 정보를 갖는 부분 - 자세한 설명은 주석

   ```javascript
   this.state = {
       data: {
           // 과제 수행에 필요한 jstree plugin들 ..
           plugins: ["checkbox", "contextmenu", "types", "dnd"],
           core: {
               data: jsonData,
               "check_callback": true // tree가 수정되는 것을 허락함.
           },
           types: {// 파일 type에 따라 icon 이미지 다르게 설정.
               "#": {
                   "valid_children": ["project"]// 자식 노드로 가능한 노드 type
               },
               "project": {
                   "icon": "./assets/images/project.png",
                   "valid_children": ["folder", "c_file"]
               },
               "folder": {
                   "icon": "./assets/images/folder.png",
                   "valid_children": ["folder", "c_file"]
               },
               "c_file": {
                   "icon": "./assets/images/c_file.png",
                   "valid_children": "none"
               }
           },
           contextmenu: {
               'select_node': false, // 노드 우클릭 시 체크박스 체크 되는 현상 막음.
               'items': showContextMenu // 노드 우클릭 시 context 메뉴 show
           }
       },
   };
   ```

----------

**결과**

**Github pages 배포**

   URL : https://ckdgns3167.github.io/vplus_assignment/

 ![K-003](https://user-images.githubusercontent.com/52457180/76155741-b3716180-6133-11ea-8647-9418ef126f84.png)

