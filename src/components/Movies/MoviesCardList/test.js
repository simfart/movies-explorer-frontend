class AppComponent extends React.Component {
    state = {
      numChildren: 0
    }
  
    render () {
      const children = [];
  
      for (var i = 0; i < this.state.numChildren; i += 1) {
        children.push(<ChildComponent key={i} number={i} />);
      };
  
      return (
        <ParentComponent addChild={this.onAddChild}>
          {children}
        </ParentComponent>
      );
    }
  
    onAddChild = () => {
      this.setState({
        numChildren: this.state.numChildren + 1
      });
    }
  }
  
  const ParentComponent = props => (
    <div className="card calculator">
      <p><a href="#" onClick={props.addChild}>Add Another Child Component</a></p>
      <div id="children-pane">
        {props.children}
      </div>
    </div>
  );

  const App = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 700;
    React.useEffect(() => {
     const handleResizeWindow = () => setWidth(window.innerWidth);
      // subscribe to window resize event "onComponentDidMount"
      window.addEventListener("resize", handleResizeWindow);
      return () => {
        // unsubscribe "onComponentDestroy"
        window.removeEventListener("resize", handleResizeWindow);
      };
    }, []);
    
    if (width > breakpoint) {
      return (
        <div>
          <h3>Component 1</h3>
          <p>Current width is {width} px</p>
        </div>
      );
    }
    return (
      <div>
        <h3>Component 2</h3>
        <p>Current width is {width} px</p>
      </div>
    );
  }
  