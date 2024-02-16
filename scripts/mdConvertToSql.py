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


def create_sql_file(data, schedule_id):
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

        f.write(f"""
            INSERT INTO schedule (id, title, end_time, start_time, location, tag_line, type, active, description, image, user_id)
            VALUES ({schedule_id}, '{title}', '{end_time}',
                    '{start_time}', '{location}', '{tag_line}', '{type}', {active}, '{description}', '{image}' NULL);
            """)

        for activity in data[1]:
            # Insert location data if it exists
            if 'location' in activity:
                coordinates = ",".join(
                    map(str, activity['location']['coordinates']))
                f.write(f"""
                    INSERT INTO location (id, coordinates, title)
                    VALUES ({location_id}, '{coordinates}', '{activity['location']['title']}');
                """)
                location_id += 1

            # Insert activity data
            try:
                f.write(f"""
                    INSERT INTO activity (winner, end_time, id, location_id, schedule_id, start_time, details, title, type, user_id)
                    VALUES ({activity['winner']}, '{activity['end']}', {activity_id}, {location_id - 1}, {schedule_id}, '{activity['start']}', '{activity.get('details', '')}', '{activity['title']}', '{activity.get('type', '')}', NULL);
                """)
            except Exception as e:
                logging.error(f"Error parsing activity data: {e}")

            # Insert presenter data if it exists
            if 'presenters' in activity:
                for presenter in activity['presenters']:
                    f.write(f"""
                        INSERT INTO presenter (activity_id, id, name)
                        VALUES ({activity_id}, {presenter_id}, '{presenter}');
                    """)
                    presenter_id += 1

            activity_id += 1


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('schedule_id', type=int,
                        help='an integer for the schedule_id')

    args = parser.parse_args()

    create_sql_file(parse_markdown(markdown_content), args.schedule_id)
