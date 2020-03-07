import React from "react";
import TreeView from 'react-simple-jstree'; // react에서 jstree 사용
import * as $ from 'jquery' // react에서 jquery 사용

class Tree extends React.Component {

    constructor(props) {
        super(props);
        // 파일 구조 하드 코딩
        // 나중에는 API로 파일 구조 받아야 함.
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

        function showContextMenu(node) {// 노드 오른쪽 마우스 클릭하면 나오는 메뉴의 목록 지정 
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
                        "valid_children": ["project"]
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
    }
    render() {
        const data = this.state.data;
        return <TreeView treeData={data} />;
    }
}

export default Tree;