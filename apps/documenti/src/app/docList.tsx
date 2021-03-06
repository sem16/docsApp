import React from 'react';
import { Component, ReactElement } from 'react';
import './app.scss';
interface DocListProps{
}

 export class DocList extends Component<DocListProps,unknown>{
   /**
    *
    */
   constructor(props) {
     super(props);
     this.getDocs();
   }
   public state={
     filenames: []
   }
  async getDocs(){
    const res = await fetch(`/api/files`,{method: 'GET'});
    const filenames = await res.json();
    console.log(filenames);
    return filenames;
  }

  async download(filename: string){
    const res = await fetch(`/api/getFile?file=${filename}`)
    if(res.ok){
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
  }

  async componentDidMount(){
    const filenames = await this.getDocs();
    this.setState({filenames: filenames});
  }
  public render(): ReactElement<DocListProps> {
    return (
      <div style={{ height: 'fit-content',minHeight: 'calc(100% - 20px)'}}>
        {/* {this.state.filenames.map(file => (
        <div className='Mylist'>
          <div id="nome">
            <p>{file}</p>
          </div>

          <div>
            <button id="bottone"
              key={file}
              value={file}
              onClick={e =>this.download(e.currentTarget.value)}>
              <img src="../assets/download.svg"></img>
            </button>

          </div>
        </div>
        ))} */}
     <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">File</th>
              <th scope="col" style={{textAlign: 'center'}}>Download</th>
            </tr>
          </thead>
        {this.state.filenames.map(file => (
          <tr>
            <th scope="row">{file}</th>
            <th scope="row" style={{textAlign: 'center'}}>
              <button className="btn btn-light"
              id="bottone"
              key={file}
              value={file}
              onClick={e =>this.download(e.currentTarget.value)}>
                <img  className="imgStyle" src="../assets/download.svg"></img>
              </button>
            </th>
          </tr>
        ))}
      </table>
      </div>

    );
  }
}

