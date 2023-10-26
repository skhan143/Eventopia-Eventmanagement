using Microsoft.AspNetCore.Mvc;
using Eventopia2023.api.Models.Request;
using Eventopia2023.api.Models.Response;
using Eventopia2023.api.Providers;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Eventopia2023.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginProvider _loginProvider;
        public LoginController(ILoginProvider loginProvider)
        {
            _loginProvider = loginProvider;
        }
        [Route("GetLogin")]
        [HttpPost]
        public bool GetLogin(LoginRequest loginRequest)
        {

           return _loginProvider.GetUserByCredentials(loginRequest);
        }
        [Route("Registration")]
        [HttpPost]
        public bool Registration(RegistrationRequest registrationRequest)
        {
            return _loginProvider.RegisterUserWithDetails(registrationRequest);
        }

    }
}
