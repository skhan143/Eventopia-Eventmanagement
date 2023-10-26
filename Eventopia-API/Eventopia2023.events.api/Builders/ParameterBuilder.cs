using Dapper;
using Eventopia2023.events.api.Models.Request;
using System.Data;

namespace Eventopia2023.events.api.Builders
{
    public interface IParameterBuilder
    {
        DynamicParameters CreateEventBuildParameters(CreateEventRequest createEventRequest);
    }
    public class ParameterBuilder : IParameterBuilder
    {
        public ParameterBuilder()
        {
                
        }
        public DynamicParameters CreateEventBuildParameters(CreateEventRequest createEventRequest)
        {
            var parameters = new DynamicParameters();
            parameters.Add("Name", createEventRequest.Name, DbType.String);
            parameters.Add("Description", createEventRequest.Description, DbType.String);
            parameters.Add("Organizer", createEventRequest.Organizer, DbType.String);
            parameters.Add("EventDate", createEventRequest.EventDate, DbType.String);
            parameters.Add("EventTime", createEventRequest.EventTime, DbType.String);
            parameters.Add("Location", createEventRequest.Location, DbType.String);
            parameters.Add("CategoryId", createEventRequest.CategoryId, DbType.Int32);
            parameters.Add("@IsSuccess", dbType: DbType.Boolean, direction: ParameterDirection.Output);

            return parameters;
        }
    }
}
