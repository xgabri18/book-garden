from flask_restful import Resource


from models.models import Bitch

class Testando(Resource):
    def get(self,name):
        print( )
        return {"data" : "Hej Gej Fungujem - " + name + "-" + str(Bitch.query.all()[0])} #

#api-file.add_resource(Testando, "/skuska")