import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as json from 'jsonc-parser';

export class ChapterNode extends vscode.TreeItem
{
    constructor(
        public readonly label: string,
        private name: string,
        private seq: number,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly needIcon: boolean,
        public readonly command?: vscode.Command
    )
    {
        super(label, collapsibleState);
        if(needIcon)
        {
            this.iconPath = 
            {

                light: path.join(__dirname, '..', 'media', 'chapter.svg'),
                dark: path.join(__dirname, '..', 'media', 'chapter.svg')
            };
        }
        else 
        {
            this.iconPath = {};
        }
    }

    get tooltip(): string
    {
        return `${this.seq}-${this.name}`;
    }

    get description(): string 
    {
        return this.name;
    }
}

export class BookContentsProvider implements vscode.TreeDataProvider<ChapterNode>
{
    private _onDidChangeTreeData: vscode.EventEmitter<ChapterNode | undefined> = new vscode.EventEmitter<ChapterNode | undefined>();
    readonly onDidChangeTreeData: vscode.Event<ChapterNode | undefined> = this._onDidChangeTreeData.event;
    
    private contents: any;
    private workspaceRoot: string | undefined;

    constructor()
    {
        this.contents = null;
        this.workspaceRoot = vscode.workspace.rootPath;
    }

    /**
     * @override methods
     */
    getTreeItem(element: ChapterNode): vscode.TreeItem
    {
        return element;
    }

    getChildren(element?: ChapterNode): Thenable<ChapterNode[]>
    {
        if(!this.workspaceRoot)
        {
            vscode.window.showInformationMessage('Empty Workspaces...');
            return Promise.resolve([]);
        }
        if(!this.contents)
        {
            vscode.window.showInformationMessage('This Workspace is not defined as a book');
            return Promise.resolve([]);
        }
        if(element)
        {
            // not the root 
        }
        return Promise.resolve([]);
    }

    /**
     * @functions
     */
    loadWriterConfig(root: string): void {};

    refresh() : void
    {
        this.workspaceRoot = vscode.workspace.rootPath;
        this._onDidChangeTreeData.fire();
    }
};