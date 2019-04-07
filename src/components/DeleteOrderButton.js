

const DeleteOrderButton = (props) => {
  console.log('Rendering Delete Order Button with props', props);
}

// <Mutation mutation={UPDATE_ORDER}>
// {(updateOrder, {data}) => (
//   <div>
//     <form onSubmit={e => {
//       e.preventDefault()
//       updateOrder({
//         variables: {
//           input: {
//             id: orderId,
//             name: newOrderName
//           }
//         }
//       })
//       newOrderName = ''
//     }}>
//       <input ref={node => {
//         newOrderName=node
//       }}/>
//       <button type="submit">Update Order Name</button>
//     </form>
//   </div>
// )}
// </Mutation>
