import yaml
import logging
import codecs
import argparse

# create log file to log both error and info
logging.basicConfig(filename='mdConvertToSql.log', level=logging.INFO)


def parse_markdown(markdown_content):
    try:
        metadata_str = markdown_content.split('---')[1].strip()
        kitscon_info = markdown_content.split('---')[2].strip()

        metadata = yaml.safe_load(metadata_str)
        info = yaml.safe_load(kitscon_info)
        schedule_data = {k: metadata[k] for k in metadata if k != 'schema'}
        schedule_data['description'] = info

        schema_data = metadata.get('schema')

        return [schedule_data, schema_data]
    except Exception as e:
        logging.error(f"Error parsing markdown content: {e}")
        return []


try:
    with codecs.open('kitscon-23-2.md', 'r', encoding='utf-8') as f:
        markdown_content = f.read()
except Exception as e:
    logging.error(f"Error reading markdown file: {e}")
    markdown_content = ""


def create_sql_file(data):
    location_id = 1
    activity_id = 1
    presenter_id = 1
    print("data:", data)
    with open('insert_queries.sql', 'w', encoding='utf-8') as f:
        title = data[0].get('title')
        active = data[0].get('active')
        end_time = data[0].get('end')
        start_time = data[0].get('start')
        location = data[0].get('location')
        tag_line = data[0].get('tagLine')
        type = data[0].get('type')
        description = data[0].get('description')
        image = data[0].get('image')
        id = 1
        pres_id = 1

        f.write(f"""
                WITH inserted_schedule AS (
                INSERT INTO schedule (title, end_time, start_time, location, tag_line, type, active, description, image_url, user_id)
                VALUES ('{title}', '{end_time}', '{start_time}', '{location}', '{tag_line}', '{type}', {active}, '{description}', '{image}', NULL)
                RETURNING id
                ),
            """)

        for index, activity in enumerate(data[1]):
            # Insert location data if it exists
            if 'location' in activity:
                try :
                    coordinates = ",".join(
                        map(str, activity['location']['coordinates']))
                    f.write(f"""
                            inserted_location{id} AS (
                            INSERT INTO location (coordinates, title)
                            VALUES ('{coordinates}', '{activity['location']['title']}')
                            RETURNING id
                            ),
                    """)
                except Exception as e:
                    logging.error(f"Error parsing location data: {e}")
            if 'location' not in activity:
                try :
                    f.write(f"""
                            inserted_location{id} AS (
                            INSERT INTO location (coordinates, title, subtitle)
                            VALUES ('', '', '')
                            RETURNING id
                            ),
                    """)
                except Exception as e:
                    logging.error(f"Error parsing location data: {e}")

            # Insert activity data
            
            try:
                if index == len(data[1]) - 1:
                    f.write(f"""
                            inserted_activity{id} AS (
                            INSERT INTO activity (winner, end_time, location_id, schedule_id, start_time, details, title, type, user_id)
                            SELECT {activity['winner']}, '{activity['end']}', l.id, s.id, '{activity['start']}', '{activity.get('details', '')}', '{activity['title']}', '{activity.get('type', '')}', NULL
                            FROM inserted_schedule s, inserted_location{id} l
                            RETURNING id
                            );
                    """)
                if index != len(data[1]) - 1:
                    f.write(f"""
                            inserted_activity{id} AS (
                            INSERT INTO activity (winner, end_time, location_id, schedule_id, start_time, details, title, type, user_id)
                            SELECT {activity['winner']}, '{activity['end']}', l.id, s.id, '{activity['start']}', '{activity.get('details', '')}', '{activity['title']}', '{activity.get('type', '')}', NULL
                            FROM inserted_schedule s, inserted_location{id} l
                            RETURNING id
                            ),
                    """)
            except Exception as e:
                logging.error(f"Error parsing activity data: {e}")

            # Insert presenter data if it exists
            if 'presenters' in activity:
                for presenter in activity['presenters']:
                    f.write(f"""
                        inserted_presenter{pres_id} AS (
                            INSERT INTO presenter (activity_id, name)
                            SELECT a.id, '{presenter}'
                            FROM inserted_activity{id} a
                        ),
                    """)
                    pres_id += 1
            id += 1

# if __name__ == "__main__":
#     parser = argparse.ArgumentParser(description='Process some integers.')
#     parser.add_argument('schedule_id', type=int,
#                         help='an integer for the schedule_id')

#     args = parser.parse_args()

create_sql_file(parse_markdown(markdown_content))
