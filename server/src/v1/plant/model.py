from db import Db

class PlantModel():
    def sanitize(self, plants):
        if not isinstance(plants, (list, tuple)):
            plants = [plants]
        clean_plants = []
        for plant in plants:
            if not isinstance(plant, dict):
                continue
            if not (
                'id' in plant and
                'name' in plant and
                'scientific_name' in plant and
                'filename' in plant and
                'area' in plant
                ):
                continue
            clean_plants.append(plant)
        return clean_plants

    def create(self, plants):
        if not isinstance(plants, (list, tuple)):
            plants = [plants]
        clean_plants = self.sanitize(plants)
        if len(plants) != len(clean_plants):
            return False
        queries = []
        for plant in clean_plants:
            sql = "INSERT INTO plants(" + \
                "name, " + \
                "scientific_name, " + \
                "filename, " + \
                "area, " + \
                "date_updated" + \
                ") VALUES(%s, %s, %s, %s, TO_DATE('%s', 'YYYY-MM-DD'))"
            queries.append({"sql": sql, "bind": (
                plant['name'],
                plant['scientific_name'],
                plant['filename'],
                plant['area'],
                plant['date_updated'],
            )})
        db = Db.get_instance()
        result = db.transactional(queries)
        return plants

    def read(self, filters=None, count_only=False):
        db = Db.get_instance()
        fields = ['*']
        offset = 0
        limit = 5
        if filters is not None:
            if 'fields' in filters:
                tmp_fields = []
                for field in filters['fields']:
                    if field in ['id', 'name', 'scientific_name', 'area', 'date_updated']:
                        tmp_fields.append(field)
                if len(tmp_fields) > 0:
                    fields = tmp_fields
            if 'id' in filters:
                sql = "SELECT " + ','.join(fields) + " FROM plants WHERE id = %s"
                plant = db.fetchone(sql, filters['id'])
                return plant
            if 'offset' in filters:
                offset = int(filters['offset'])
            if 'limit' in filters:
                limit = int(filters['limit'])
        cols = 'COUNT(*) AS total' if count_only else ','.join(fields)
        sql = "SELECT " + cols + " FROM plants"
        if not count_only:
            sql += " ORDER BY name LIMIT " + str(offset) + ", " + str(limit)
        if count_only:
            row = db.fetchone(sql)
            return row['total'] if row else 0
        else:
            return db.fetchall(sql)

    def update(self, plants):
        if not isinstance(plants, (list, tuple)):
            plants = [plants]
        clean_plants = self.sanitize(plants)
        if len(plants) != len(clean_plants):
            return False
        queries = []
        for plant in clean_plants:
            sql = "UPDATE plants SET "
            for attr, value in plant.__dict__.items():
                sql += attr + " = " + value
            sql += "WHERE id = %s"
            queries.append({"sql": sql, "bind": plant['id']})
        db = Db.get_instance()
        db.transactional(queries)
        return plants

    def delete(self, plants):
        counter = 0
        if not isinstance(plants, (list, tuple)):
            plants = [plants]
        placeholder = []
        queries = []
        for plant in plants:
            placeholder.append('%s')
        sql = "DELETE FROM plants WHERE id IN (" + ", ".join(placeholder) + ")"
        queries.append({"sql": sql, "bind": plants})
        db = Db.get_instance()
        counter = db.transactional(queries)
        return counter
