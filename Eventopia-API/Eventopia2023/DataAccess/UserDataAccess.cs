using Dapper;
using Eventopia2023.api.Models.Request;
using Eventopia2023.api.Models.Response;
using System.Data.SqlClient;
using System.Data;

namespace Eventopia2023.api.DataAccess
{
    public interface IUserDataAccess
    {
        LoginResponse GetUserByCredentials(LoginRequest loginRequest);
        bool RegisterUserWithDetails(RegistrationRequest registrationRequest);
    }
    public class UserDataAccess : IUserDataAccess
    {
        private readonly IConfiguration _configuration;

        private string connString = "";
        public UserDataAccess(IConfiguration configuration)
        {
           _configuration = configuration;
            connString = SetConnstring();
        }
        
        public LoginResponse GetUserByCredentials(LoginRequest loginRequest)
        {

            using (IDbConnection dbConnection = new SqlConnection(connString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@inputUsername", loginRequest.Email);
                parameters.Add("@inputPasswordHash", loginRequest.Password);
                parameters.Add("@isMatching", dbType: DbType.Boolean, direction: ParameterDirection.Output);

                dbConnection.Open();

                // Execute the stored procedure using Dapper
                dbConnection.Execute(
                    "CheckUsernamePasswordMatch",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                // Retrieve the value of the output parameter after the stored procedure execution
                var isMatching = new LoginResponse { IsMatching = parameters.Get<bool>("@isMatching") };

                return isMatching;
            }
        }


        public bool RegisterUserWithDetails(RegistrationRequest registrationRequest)
        {

            /*
             * Owner: Abdul Hannan
             * Description: This method is used to register users
             * Functionality: This method registers users and if a user exists it returns false
             */
            var IsRegistrationSuccess = false;
            try
            {
                using (IDbConnection dbConnection = new SqlConnection(connString))
                {
                    dbConnection.Open();
                    var isEighteenAbove = false;
                    if (registrationRequest.age >= 18)
                    {
                        isEighteenAbove = true;
                    }
                    // Create dynamic parameters using Dapper's DynamicParameters class
                    var parameters = new DynamicParameters();
                    parameters.Add("username", registrationRequest.username, DbType.String);
                    parameters.Add("passwordHash", registrationRequest.passwordHash, DbType.String);
                    parameters.Add("email", registrationRequest.email, DbType.String);
                    parameters.Add("firstname", registrationRequest.firstname, DbType.String);
                    parameters.Add("lastname", registrationRequest.lastname, DbType.String);
                    parameters.Add("age", registrationRequest.age, DbType.Int32);
                    parameters.Add("gender", registrationRequest.gender, DbType.String);
                    parameters.Add("phone_number", registrationRequest.phoneNumber, DbType.String);
                    parameters.Add("is_eighteen_above", isEighteenAbove, DbType.Boolean);
                    parameters.Add("location", registrationRequest.location, DbType.String);
                    parameters.Add("@isDuplicateUsername", dbType: DbType.Boolean, direction: ParameterDirection.Output);

                    // Execute the stored procedure using Dapper
                    dbConnection.Execute(
                        "RegisterUserWithDetails",
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );

                    var isMatching = parameters.Get<bool>("@isDuplicateUsername");
                    if (isMatching)
                    {
                       return IsRegistrationSuccess = false;
                    }
                    IsRegistrationSuccess = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return IsRegistrationSuccess;
        }

        private string SetConnstring()
        {
           return connString = _configuration.GetConnectionString("DefaultConnection");
        }
    }
}
