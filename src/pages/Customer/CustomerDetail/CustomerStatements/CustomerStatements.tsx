import PrivateRoute from 'components/Route/PrivateRoute';
import { customerStatementRoutes } from 'pages/Customer/routes';

const CustomerStatements: React.FC<any> = () => {
  return (
    <>
      <PrivateRoute appRoutes={customerStatementRoutes} />
    </>
  );
};

export default CustomerStatements;
