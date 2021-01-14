/**
 
 function render(props) {
  const { container } = props;
  ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
 }

 ReactDOM.render(<App />, dom)
 */
// let isSubApp = false;
// export function modifyClientRenderOpts(memo: any) {
//   console.log('===memo===')
//   console.log(memo)
//   /**
//    * memo: {
//       defaultTitle: ""
//       history: {length: 50, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
//       isServer: undefined
//       plugin: Plugin {hooks: {…}, validKeys: Array(9)}
//       rootElement: "root-master"
//       routes: (3) [{…}, {…}, {…}]
//     }
//    */
//   return {
//     ...memo
//     // rootElement: isSubApp ? 'sub-root' : memo.rootElement,
//   };
// }
