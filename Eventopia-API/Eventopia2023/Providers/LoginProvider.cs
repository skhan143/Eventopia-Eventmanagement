using Eventopia2023.api.DataAccess;
using Eventopia2023.api.Models.Request;
using Eventopia2023.api.Models.Response;

namespace Eventopia2023.api.Providers
{
    public interface ILoginProvider
    {
        bool GetUserByCredentials(LoginRequest request);
        bool RegisterUserWithDetails(RegistrationRequest registrationRequest);
    }
    public class LoginProvider : ILoginProvider
    {
        private readonly IUserDataAccess _userDataAccess;
        public LoginProvider(IUserDataAccess userDataAccess)
        {
            _userDataAccess = userDataAccess;
        }

        public bool GetUserByCredentials(LoginRequest request)
        {
            var loginData = _userDataAccess.GetUserByCredentials(request);
            return loginData.IsMatching;
        }

        public bool RegisterUserWithDetails(RegistrationRequest registrationRequest)
        {
            var registraionData = _userDataAccess.RegisterUserWithDetails(registrationRequest);
            return registraionData;
        }
    }
}
