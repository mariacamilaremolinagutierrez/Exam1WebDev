import React, {Component} from 'react';
import update from 'immutability-helper';
//import AgregarItem from './agregarItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stringToQuery: "",
      componentMounted: false,
      photos: [],
      colors: ["red","orange", "yellow", "green", "blue","indigo", "violet" ]
    }
  }

  componentDidMount() {
    this.setState({componentMounted: true})
  }

  makeQuery(color) {
    console.log('ruta: /flickr/' + this.state.stringToQuery + " " + color);
    fetch('/flickr/' + this.state.stringToQuery)
      .then(function(response) {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(data) {
        console.log("Gotit!");
        this.setState({photos: data.photos})
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
  }

  getUrl(ph) {
    return "https://farm"+
        ph.farm +
        ".staticflickr.com/" +
        ph.server +
        "/"+
        ph.id+
        "_" +
        ph.secret +
        "_s.jpg";
    }

  changeQuery(newString){
    this.setState({stringToQuery: newString});

    if (this.state.componentMounted){
      this.makeQuery('red');
    }
  }

  render() {
    return(
      <div>

        <br />

        <div className="row">
          <h1>FLICKR RAINBOW</h1>
          <p>
            by: MCRG
          </p>
        </div>

        <br />

        <div className="row">
          <input type="text" value={this.state.stringToQuery} onChange={(event) => { this.changeQuery(event.target.value) } } />
          {/* Componente: Fotos
          <div className="col-md-8 col-xs-12">
            <ListarItems ref={(input) => { this.listarItemsChild = input; }} user={this.state.user} />
          </div>
          */}
        </div>

        <table className="table table-striped custab">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Pagar en</th>
              <th>Recordatorio</th>
              <th>Valor</th>
              <th className="text-center">Accion</th>
              {/*
                {this.state.tableTitles.map(function(title) {
                  return <th key={title} className="text-center">{title}</th>;
                })}
              */}
            </tr>
          </thead>
          <tbody>
            {
              this.state.items != null &&
              this.state.items.map(function(row, i) {
                if (row['category']==cat){
                  return(
                    <tr key={i}>
                      {
                        this.state.displayTableKeys.map(function(key, j) {
                          if (this.state.formatsDisplayTableKeys[j] =='date'){
                            var date = row[key].split('T')[0].split('-'); //2017-01-12
                            return (
                              <td key={key}>{date[2]}/{date[1]}/{date[0]}</td>
                            );
                          }
                          else if (this.state.formatsDisplayTableKeys[j] =='money') {
                            var money = Number(row[key]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                            return (
                              <td key={key}>${money}</td>
                            );
                          }
                          else{
                            return (
                              <td key={key}>{row[key]}</td>
                            );
                          }
                          }, this)
                      }
                      <td className="text-center">
                        {/*
                        <button className="btn btn-info btn-xs" onClick={this.deleteItem.bind(this, row.id)}><span className="glyphicon glyphicon-edit"></span> Editar </button>
                        <br />
                        */}
                        <button className="btn btn-danger btn-xs" onClick={this.deleteItem.bind(this, row._id)}><span className="glyphicon glyphicon-remove"></span> Eliminar </button>
                      </td>
                    </tr>
                  );
                }
              }, this)
            }
          </tbody>
        </table>

      </div>
    );
  }
}

export default App;
